import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ModalImage from './Modal/ModalImage';
import imageApi from '../api/api';
import './styles.css';

export function App() {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const data = await imageApi(keyword, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [keyword, page]);

  const onSubmitForm = query => {
    setKeyword(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const saveLargeImage = imageURL => {
    setLargeImageURL(imageURL);
  };

  const hideLargeImage = () => {
    setLargeImageURL(null);
  };

  const showButton = !loading && images.length !== totalImages;

  return (
    <>
      <Searchbar onSubmitForm={onSubmitForm} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={saveLargeImage} />
      )}
      {largeImageURL && (
        <Modal onCloseModal={hideLargeImage}>
          <ModalImage largeImage={largeImageURL} />
        </Modal>
      )}

      {showButton && <Button text="Load more" buttonAction={onLoadMore} />}

      {loading && <Loader />}
      {error && <p>ERROR</p>}
    </>
  );
}
