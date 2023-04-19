import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { getImages } from './Api/api';
import { ImageGallery } from './ImageGallery/ImageGallary';
export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [per_page] = useState(12);
  const [largeImage, setLargeImage] = useState(null);
  const createSearchText = searchText => {
    setSearchText(searchText);
  };

  useEffect(() => {
   
    if (searchText) {
      setIsLoading(true);
      setPage(1);

      getImages(searchText, 1)
        .then(data => {
          if (data.totalHits === 0) {
            setIsLoading(false);
            return Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          if (data.totalHits <= 12) {
            setIsLoading(false);
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
          if (data.status === 'error') {
            return Promise.reject(data.message);
          } else if (data.totalHits > 0) {
            setIsLoading(false);
            Notiflix.Notify.success(
              `Hooray! We found ${data.totalHits} images.`
            );
          }
          const imgArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );

          setImages(imgArr);
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [searchText]);

  useEffect(() => {
    if (page === 1) return;
    if (searchText) {
      setIsLoading(true);

      getImages(searchText, page)
        .then(data => {
          if (data.totalHits === 0) {
            setIsLoading(false);
            return Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          if (Math.floor(data.totalHits / page) < 12) {
            setIsLoading(false);
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }

          const imgArr = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );
          
            setImages(prev => [...prev, ...imgArr]);
          
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [page]);

  const nextPage = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);
  };

  const openModal = e => {
    const largeImage = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      setShowModal(true);
      setLargeImage(largeImage);
    }
  };

  const toggleModal = () => {
    setShowModal(false);
  };
  const onButtonVisible = () => {
    if (images && images.length < Number(page * per_page)) {
      return false;
    } else return true;
  };

  return (
    <Container>
      <Searchbar onSubmit={createSearchText} />
      {isLoading && <Loader />}
      {error && `${error}`}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {onButtonVisible() && <Button nextPage={nextPage} />}
      {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
    </Container>
  );
};
