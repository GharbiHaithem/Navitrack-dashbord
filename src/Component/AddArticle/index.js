import React, { useEffect, useState } from 'react';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BsUpload } from "react-icons/bs";
import * as yup from 'yup';
import { MdLabelImportant } from "react-icons/md";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { articleById, articles,createartice } from '../../features/articleSlice';
import { resetState, upload } from '../../features/uploadSlice';
import { useParams } from 'react-router';

const AddArticle = () => {
  const dispatch = useDispatch();
  const [_images, set_Images] = useState([]);
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { id } = useParams();
  const { article } = useSelector(state => state.article);
  
  useEffect(() => {
    if (id !== undefined) {
      dispatch(articleById(id));
    }
  }, [dispatch, id]);

  const schema = yup.object().shape({
    titre: yup.string().required('Titre est requis'),
    description: yup.string().required('Description est requise'),
    images_article: yup.array().min(1, 'Champ image article est obligatoire').required('Champ image article est obligatoire')
  });

  const formik = useFormik({
    initialValues: {
      titre: id !== undefined ? article?.titre : '' || '',
      description: id !== undefined ? article?.description : '' || '',
      images_article: id !== undefined ? article?.images_article : [] || [],
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      dispatch(createartice(values));
      formik.resetForm();
      setLocalImageUrls([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
    }
  });

  const handleSelectFile = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedFiles(selectedFiles);
    set_Images(selectedFiles);
    
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setLocalImageUrls(urls);

    formik.setFieldValue('images_article', selectedFiles);
  };

  useEffect(() => {
    if (_images.length > 0) {
      dispatch(upload(_images));
    }
  }, [_images, dispatch]);

  const { images, isLoading } = useSelector(state => state.uploads);

  useEffect(() => {
    if (images.length > 0) {
      formik.setFieldValue('images_article', images);
    }
  }, [images]);

  useEffect(() => {
    if (id === undefined) {
      formik.resetForm();
    }
  }, [id]);

  return (
    <div className='w-full md:w-[80%] mx-auto mt-5 py-5'>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mt-3">
          <label className="col-form-label font-bold text-[#236693] text-xs md:text-sm">Titre Article</label>
          <input 
            className="form-control rounded-lg text-xs p-2 md:h-11"
            type="text"
            name='titre'
            value={formik.values.titre}
            onChange={formik.handleChange('titre')}
            placeholder="Titre Article"
          />
          {formik.touched.titre && formik.errors.titre ? (
            <div className='p-2 w-full flex items-center bg-red-400 text-white gap-3'>
              <MdLabelImportant />
              <span className='mb-0 text-sm'>{formik.errors.titre}</span>
            </div>
          ) : null}
        </div>
        <div className="form-group mt-1 flex flex-col w-full gap-1">
          <label className="custom-file-upload">
            <input type="file" multiple placeholder="Année de fabrication" onChange={handleSelectFile} />
            <div className='flex items-center gap-2'>
              <BsUpload />
              <span className='mx-3'>Sélectionner une image pour article</span>
            </div>
          </label>
          <span className='text-xs font-extralight'>Format JPG ou JPEG uniquement</span>
        </div>
        <div>
          {localImageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Local Preview ${index}`} style={{ width: '300px', height: 'auto', margin: '10px' }} />
          ))}
          {formik.touched.images_article && formik.errors.images_article ? (
            <div className='p-2 w-full flex items-center bg-red-400 text-white gap-3'>
              <MdLabelImportant />
              <span className='mb-0 text-sm'>{formik.errors.images_article}</span>
            </div>
          ) : null}
        </div>
        <ReactQuill 
          className='h-10 mb-5'
          style={{ height: 'max-content' }}
          theme="snow"
          placeholder='Description article'
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          name='description'
        />
        {formik.touched.description && formik.errors.description ? (
          <div className='p-2 w-full flex items-center bg-red-400 text-white gap-3'>
            <MdLabelImportant />
            <span className='mb-0 text-sm'>{formik.errors.description}</span>
          </div>
        ) : null}
        <button 
          type='submit'
          disabled={isLoading ? true : false}
          className={`p-2 w-full text-white mt-2 c rounded-lg`}
          style={{ background: `${isLoading ? '#eee' : '#236693'}`, marginTop: "15px" }}
        >
          {id !== undefined ? 'Editer' : 'Ajouter'} Article
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
