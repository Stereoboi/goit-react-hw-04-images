import { useState, useEffect } from "react";
import {fetchImage} from '../api/api.js' 
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
import { Gallery } from "components/ImageGallery/ImageGallery.jsx";
import { LoadMoreBtn } from "components/Button/Button.jsx";
import { Wrapper } from "./App.styled.js";
import { Modal } from "components/Modal/Modal.jsx";
import { Loader } from "components/Loader/Loade.jsx";

import { Notification, Toast } from "components/NotificationToastify/Notification.jsx";

export const App = () => {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setSHowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {

    if (searchQuery === '') {
      return
    }
    const getFetch = async () => {
      setStatus("pending");
      setLoadMore(true);

      try {
        const result = await fetchImage(searchQuery, page);
        console.log(result);

        if (!result.length) {
          throw new Error();
        }

        if (result.length < 12) {
          setLoadMore(false)
        }

        setStatus("resolved");
        setImages(prevState => [...prevState, ...result])

      //  console.log(this.state.images); 
        
      } catch (err) {
        setStatus("rejected");
        Notification();
      }
    }

    getFetch();   

  }, [searchQuery, page])


  const toggleModal = () => {
    setSHowModal(!showModal )
  };

  const loadMoreImg = () => {
    setPage(page + 1)
  }

  const findModalImage = (id, img, tags) => {
    setModalImage({ id: id, img: img, tags: tags });
  };

  const formSubmitHandler = data => {
    console.log(data);
  
      setSearchQuery(data)
      setPage(1)
      setImages([])
      setStatus("idle")
    
  }

      if (status === 'idle') {
         return <Searchbar onSubmit={formSubmitHandler} />
                          
      }
      
      if (status === 'pending') {
         return(
                <Wrapper>
                  <Searchbar onSubmit={formSubmitHandler} />
                  <Gallery
                      images={images}
                      modalImage={findModalImage}
                      toggleModal={toggleModal}
                  />
                  <Loader/>
                </Wrapper>
         )       
      }
      if (status === 'resolved') {
        return (
                <Wrapper>
                  <Searchbar onSubmit={formSubmitHandler} />
                  <Gallery
                    images={images}
                    modalImage={findModalImage}
                    toggleModal={toggleModal}
                  />
                  {showModal && (
                    <Modal onClose={toggleModal} modalImage={modalImage} />
                  )}
                  
                  {loadMore && <LoadMoreBtn loadMore={loadMoreImg} />}
                  
                </Wrapper>
          )                       
      }
      
      if (status === 'rejected') {
          return (
                  <Wrapper>
                    <Searchbar onSubmit={formSubmitHandler} />
                    <Toast/>
                  </Wrapper> 
                ) 
      }
}


