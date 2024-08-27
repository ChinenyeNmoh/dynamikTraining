import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button, Card, ProgressBar } from 'react-bootstrap';
import { useGetModulesQuery } from '../slices/moduleApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUpdateProfileMutation, useGetUserQuery } from '../slices/userApiSlice';
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Progress from '../components/Progress';
import { FaPlay, FaPause } from "react-icons/fa";


const ModuleScreen = () => {
  const { data, error, isLoading } = useGetModulesQuery();
  const modules = data?.modules || [];
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserQuery();
  const user = userData?.user;
  const [playing, setPlaying] = useState(false); // State to manage play/pause
  const [moduleView, setModuleView] = useState(null);
  const [progress, setProgress] = useState(0);
  const [updateProfile, { isLoading: updateLoading, error: updateError }] = useUpdateProfileMutation();
  const [hasWatchedFullVideo, setHasWatchedFullVideo] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const playerRef = useRef(null);

  //let's add a useEffect hook to check if the user has watched the full video so we
//can let them move on to the next module
useEffect(() => {
   
  console.log('Component updated or dependencies changed');
  
    user?.completedModule.map((module) => {
      if (module._id === moduleView) {
        setHasWatchedFullVideo(true);
      }
    });
  }, [user?.completedModule, moduleView, user?.completedModule?._id?.video?.order]);


  //set the start time of the video to the last watched time
  useEffect(() => {
    if (user?.currentModule?.lastWatchedTimestamp) {
      setStartTime(user?.currentModule?.lastWatchedTimestamp);
    }else{
      setStartTime(0);
    }
  }, [user?.currentModule?.lastWatchedTime, user, moduleView]);

  console.log('Start Time:', startTime);




  useEffect(() => {
    if (user && modules) {
      setModuleView(user?.currentModule?.moduleId?._id || modules[0]?._id);
    }
  }, [user, modules]);





  const currentModule = modules.find(module => module._id === moduleView);
  const nextModule = modules.find(module => module.video.order === currentModule?.video.order + 1);

  
  // Function to handle progress of the video player
  const handleProgress = async ({ playedSeconds }) => {
    const currentModule = modules.find(module => module?._id === moduleView);
    // Calculate the percentage of video watched
    const percentage = (playedSeconds / currentModule?.video?.duration) * 100;
    setProgress(percentage);
  
    user?.completedModule.map((module) => {
      if (module._id === moduleView) {
        setHasWatchedFullVideo(true);
      }
    });


  };
  


  

  const handlePrevious = async () => {
    const currentModule = modules.find(module => module._id === moduleView);
    if (currentModule) {
      const previousModule = modules.find(module => module.video.order === currentModule.video.order - 1);
      if (previousModule) {
        setModuleView(previousModule._id);
        setHasWatchedFullVideo(true);
        try {
          await updateProfile({
            ModuleId: previousModule._id,
            lastWatchedTime: 0
          }).unwrap();
        } catch (error) {
          console.error("Error updating to previous module:", error.message);
        }
      }
    }
  };

  const handleContinue = async () => {
    if (currentModule && hasWatchedFullVideo) {
      if (nextModule) {
        setModuleView(nextModule._id);
        
        // Check if the next module is in the user's completed modules
        const isNextModuleCompleted = user?.completedModule.some(module => module._id === nextModule._id);
        setHasWatchedFullVideo(isNextModuleCompleted);
  
        try {
          // Update the profile with the new module ID and reset the last watched time
          await updateProfile({
            ModuleId: nextModule._id,
            lastWatchedTime: 0
          }).unwrap();
        } catch (error) {
          console.error("Error updating profile:", error.message);
        }
      }
    }
  };
  
  // Function to toggle play/pause
const togglePlayPause = () => {
    setPlaying(prevPlaying => !prevPlaying);
  };

  return (
    <div>
      {(isLoading || userLoading || updateLoading) && <Loader />}
      {(userError || updateError || error) && <Message variant="danger">{userError?.message || updateError?.message || error?.message}</Message>}
      <Row className='mb-5'>
        <Col>
          {modules?.map((module) => (
            moduleView === module._id && (
              <Card key={module._id} className="mt-4">
                <Progress order={module.video.order} />
                <p className="text-end fw-bold px-2">{module.video.order}/{modules.length} completed</p>
                <Card.Header className="fw-bold text-center fs-2 py-5">
                    
                  {module.title}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <div className="video-player h-100 player contain">
                      <ReactPlayer
                        ref={playerRef}
                        url={module.video.url}
                        controls={false}
                        width="100%"
                        height="80%"
                        onPause={() => {
                          const currentTime = playerRef.current.getCurrentTime();
                          console.log("Paused at:", currentTime);
                          updateProfile({ lastWatchedTime: currentTime }).unwrap();
                          }}
                        onProgress={handleProgress}
                        playing={playing}
                        progressInterval={1000}
                        onEnded={() => {
                            setHasWatchedFullVideo(true);
                            setPlaying(false);
                            updateProfile({
                              ModuleId: nextModule?._id,
                              completedModule: currentModule?._id,
                              lastWatchedTime: 0
                            }).unwrap();
                           
                        }}
                        onReady={() => playerRef.current.seekTo( startTime)}
                        />
                        <div className="progress" role="progressbar" aria-label="Video Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-danger" style={{ width: `${progress}%` }}></div>
                            </div>
                        <Button
                        className="playbutton bg-transparent btn-sm border-0 ms-3  mt-1"
                        onClick={togglePlayPause}
                
                            >
                                {playing ? <FaPause className='fs-4' /> : <FaPlay className='fs-4' />}
                            </Button>
                        
                            
                        
                      </div>
                    </Col>
                    <Col md={12} className="py-5">
                      <Card.Text>{parse(module.content)}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                  {modules.find(module => module.video.order < modules.find(m => m._id === moduleView).video.order) && (
                    <Button
                      variant="secondary"
                      onClick={handlePrevious}
                      disabled={currentModule.video.order === 10 && !hasWatchedFullVideo && user.completedModule.length < 10}
                    >
                      <FaArrowLeft />
                    </Button>
                  )}
                   {module.video.order < modules.length && (
                    <div className='d-flex gap-2'>
                    <p className='mt-3 fw-bold'>
                      {nextModule ? `Module ${currentModule.video.order + 1}: ${nextModule.title}` : "No more modules"}
                    </p>
                    <Button
                      variant='primary'
                      onClick={handleContinue}
                      disabled={!hasWatchedFullVideo}
                    >
                      <FaArrowRight />
                    </Button>
                  </div>
                  
                   )}
                  
                  
                </Card.Footer>
              </Card>
            )
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ModuleScreen;
