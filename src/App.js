
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Layout from './Component/Layout';
import NavBar from './Component/NavBar';
import{io} from 'socket.io-client'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { BrowserRouter, Route  ,Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import { PrivateRoute } from './routes/privateRoute';
import AddUser from './Component/AddUser';
import AddAppareil from './Component/AddAppareil';
import AddClient from './Component/AddClient';
import AddVehicule from './Component/AddVehicule';
import Auth2Facteur from './Component/Auth2Facteurs';
import AlertModal from './Component/AlertModal'
import ResetPassword from './Component/ResetPassword';
import ListUser from './Component/ListUser';
import ListCompany from './Component/ListCompany';
import ListAppareil from './Component/ListAppareil';
import ForgotPassword from './Page/ForgotPassword';
import Login from './Page/Login';
import Register from './Page/Registre';
import 'react-toastify/dist/ReactToastify.css';
import ModalCompanie from './Component/ModalCompanie';
import ListCar from './Component/ListCar';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './Component/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { notifications, notifications as notificationsFn } from './features/notificationSlice';
import Devis from './Component/Devis';
import { allfactures, newFact } from './features/factureSlice';
import axios from 'axios' 
import { allusers } from './features/authSlice';
import { companies } from './features/companieSlice';
import { base_url } from './utils/base_url';
import AddArticle from './Component/AddArticle';
import ListArticles from './Component/ListArticles';
import ShowModal from './Component/ShowModal';
function App() {
  const dispatch = useDispatch()


  const socket = useRef(); // Utilisez useRef pour stocker le socket
  useEffect(() => {
    // Initialisez le socket
    socket.current = io("https://socket-io-navitrack.railway.internal");
    
    // Déconnexion propre lors du démontage du composant
    return () => {
      socket.current.disconnect();
    };
  }, []); // Ce useEffect n'a besoin de s'exécuter qu'une seule fois lors du montage
  const {notification} = useSelector(state=>state?.notif)
  const [devisIds, setDevisIds] = useState([]);


  const[notif,setNotif] = useState([])
  useEffect(() => {
    const newDevisIds = notification?.map(n => n?.devisId) || [];
    setDevisIds(newDevisIds);
    setNotif(newDevisIds);
  }, [notification]);
    
  useEffect(() => {
    socket.current.on('response', (data) => {
      console.log(data);
      setNotif((prev) => [...prev, data]);
    });
  }, [socket]);
  useEffect(() => {
    // Sort the data based on the 'createdAt' property in descending order
    const sortedData = [...notif].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setNotif(sortedData);
  }, []);
  console.log(notif);
  const userstate = useSelector(state=>state?.auth)
  useEffect(() => {
    
    socket.current.emit("adduser", userstate?.user?._id);
  
  }, []);
 useEffect(()=>{
  socket.current.on("getMessage" , (data)=>{
 
   })
 },[])
  const {appareils} = useSelector(state=>state?.appareil)
  const[showAlert,setShowAlert] = useState(false)
  const[qtyId,setQtyId] = useState({idAppareil:null,name:null})
  useEffect(()=>{
  appareils?.length>0 && appareils?.map((app)=>{
   if(app?.qtyStock  <= 2){
    setShowAlert(true)
    setQtyId({ idAppareil: app?.id, name: app?.code });
   } }
  )
  },[appareils])
  useEffect(()=>{
    dispatch(allfactures())
  },[dispatch])
  const{isLogin,message,isError,isSuccess,isLoading} = userstate
  useEffect(()=>{
if(userstate?.user !== null && userstate?.isLogin === true)    dispatch(allusers())
  },[dispatch,userstate?.isLogin,userstate?.user])
  useEffect(() => {
    dispatch(companies())
    // Configuration de l'intercepteur de requête
    const API = axios.create({baseURL:base_url});
  
    // Configuration de l'intercepteur de réponse
    const responseInterceptor = API.interceptors.response.use(
      (response) => {
        console.log(response)
        // Traitement de la réponse réussie ici
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Gérer l'erreur d'autorisation ici, par exemple, rediriger vers la page de connexion
          window.location.replace('/');
        }
        // Autres traitements d'erreur ici
        return Promise.reject(error);
      }
    );

    // Nettoyer les intercepteurs lorsque le composant se démonte
    return () => {

      API.interceptors.response.eject(responseInterceptor);
    };
  }, []);
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    
  
     
    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.matchMedia("(max-width: 600px)").matches;
            setIsScreenSmall(isSmall);
        };

        // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
        window.addEventListener("resize", handleResize);

        // Vérifie la taille de l'écran au chargement initial de la page
        handleResize();
        console.log(isScreenSmall)
        // Nettoie l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [isScreenSmall]);
    const[openMenu,setOpenMenu] = useState(false)
    const[menuStates,setMenuStates] = useState(false)
    
    const [showModal, setShowModal] = useState({});
    const {facture,factures} = useSelector(state=>state?.fact)
    const companiestate = useSelector(state=>state?.companie)
   
    const lastFactureDateStr = facture?.[facture.length - 1]?.dateFin;

  useEffect(() => {
  
       
        dispatch(newFact());
  
  }, []);
 useEffect(()=>{
  dispatch(notifications())
 },[])

const[firstFact,setFirstFact] = useState([])
useEffect(()=>{
  const clients = [...new Set(factures&&factures?.map(facture => facture.clientId?._id))];

  const facturesParClient = clients.map(client => ({
    client,
    factures:factures&& factures?.filter(facture => facture.clientId?._id === client),
  }));

  const premieresFactures = facturesParClient.map(clientData => {
    const premiereFacture = clientData.factures.length > 0 ? clientData.factures[0] : null;
    return { client: clientData.client, premiereFacture };
  });

  setFirstFact(premieresFactures);
},[factures])
const[contenuFacture , setContenuFacture]= useState(null);
console.log(firstFact)
 useEffect(() => {
  const generateHtmlContentForFacture = (facture, index) => {
    // Générer le contenu HTML en utilisant les données de la facture
    let contenuFacture = '';
    
    if (firstFact && Array.isArray(firstFact) && firstFact.length > 0) {
      const ff = firstFact[0]; // Utilisez le premier élément du tableau firstFact
  
      console.log('ff?.premiereFacture?._id:', ff?.premiereFacture?.id);
      console.log('facture?._id:', facture?.id);
      const isFirstFacture = ff?.premiereFacture?.id === facture?.id;
      console.log('isFirstFacture:', isFirstFacture);
  
      contenuFacture = isFirstFacture
        ? `
        <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Numéro de Facture</th>
              <th scope="col">Numéros de Série des Appareils</th>
              <th scope="col">Total par Unité</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${facture?.numeroFacture}</td>
              <td>${facture?.appareilId?.map((app) => app?.serialNumber).join(', ')}</td>
              <td>${facture?.priceUnitaire} X ${facture?.appareilId?.length} = ${facture?.priceUnitaire * facture?.appareilId?.length} TND</td>
              <td>${facture?.appareilId?.reduce((total, app) => total + app?.priceUnite, 0)} TND</td>
            </tr>
          </tbody>
        </table>
      </div>
        `
        : `
       
        ${facture?.numeroFacture}
           ${facture?.appareilId?.map((app)=>app?.serialNumber)}
            
             ${facture?.priceUnitaire + " X"+facture?.appareilId?.length + " = " + facture?.priceUnitaire * facture?.appareilId?.length}
       
        `;
    }
  
    return `
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Facture ${facture?.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body{
            width:100%;
            height:100vh;
          }
          table {
            border-collapse: collapse;
            width: 100% !important;
            margin-top:400px;
            border:1px solid red !important;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          .x {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            box-shadow: 0 0 10px #eee;
          }
           span {
            width:400px;
          }
        </style>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5;align-items:center; padding: 20px; margin: 10px;display: flex; justify-content: space-between;">
          <h1 style="margin-bottom:0;font-size:13px;font-weight:200">période :<br/>${facture?.dateDebut} - ${facture?.dateFin}</h1>
          <span style="float:right;margin-bottom:0; font-size:20px;color:#0766AD;font-weight:400">${facture?.clientId?.raisonSociale}</span>
        </div>
<div  style="display: flex; justify-content: space-between;align-items:center;margin-top:120px; flex-direction: row; border: 1px solid black; width: 100% !important;">
        ${contenuFacture}
     </div>   
      </body>
    </html>
  `;
  };
  

  const generateAndUploadPdf = async (htmlContent,factureId) => {
    try {
      // Envoyer le contenu HTML au backend
      const response = await axios.post('https://navitrack-spring-server-production.up.railway.app/api/generate-and-upload-pdf', {
        htmlContent: htmlContent,
        factureId:factureId
      },{
              headers: {
                 'Content-Type': 'application/json; charset=UTF-8',
                 },
               });

      // Récupérer l'URL Cloudinary du PDF généré
      const cloudinaryUrl = response.data;
      console.log('URL Cloudinary du PDF :', cloudinaryUrl);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF et de l\'upload sur Cloudinary', error);
    }
  };

  const generateAndUploadPdfForFacture = async (facture,index) => {
    try {
      console.log('Facture en cours de traitement :', facture?.id);
      // Générer le contenu HTML spécifique à cette facture
      const htmlContent = generateHtmlContentForFacture(facture,index);

      // Appeler la fonction de génération et d'upload du PDF
      await generateAndUploadPdf(htmlContent,facture?.id);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF pour la facture', error);
    }
  };
  const generateAndUploadPdfForAllFactures = async () => {
    try {
      console.log('Début de la génération et de l\'upload des PDF pour toutes les factures');
      await Promise.all(factures.map(async (fact, index) => {
        await generateAndUploadPdfForFacture(fact, index);
      }));
      console.log('Fin de la génération et de l\'upload des PDF pour toutes les factures');
    } catch (error) {
      console.error('Erreur lors de la génération et de l\'upload des PDF pour toutes les factures', error);
    }
  };

  // Appeler la fonction pour générer/upload les PDF pour toutes les factures lors du montage du composant
  generateAndUploadPdfForAllFactures();
}, [factures,firstFact]);
console.log(firstFact)
const [open, setOpen] = useState(false);
const[productId,setProductId]=useState()
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route exact  path='/' element={<Login/>}   />
          <Route path={'auth2facteur'} element={<Auth2Facteur/>} />
          <Route  path='/:token' element={<Login/>}   />
          <Route path={"forgotPassword"} element={<ForgotPassword/>} />
          <Route path={"resetPassword/:token"} element={<ResetPassword/>} />

          <Route path='/register' element={<Register/>} />       <Route
          path="/admin"
          element={<Layout  socket={socket}  setNotif={setNotif} notif={notif}  openMenu={openMenu} setOpenMenu={setOpenMenu} setMenuStates={setMenuStates} menuStates={menuStates} isScreenSmall={isScreenSmall} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="addUser" element={<AddUser/>} />
          <Route path="addappareil" element={<AddAppareil/>} />
          <Route path="addclient" element={<AddClient/>} />
          <Route path="addvehicule" element={<AddVehicule/>} />
          <Route path="addArticle" element={<AddArticle/>} />
          <Route path={'listusers'} element={<PrivateRoute><ListUser/></PrivateRoute>} />
          <Route path={'listArticle'} element={<PrivateRoute><ListArticles setProductId={setProductId}  open={open} setOpen={setOpen}/></PrivateRoute>} />
          <Route path={'updateUser/:id'} element={<PrivateRoute><AddUser/></PrivateRoute>} />
          <Route path={'listcar'} element={<PrivateRoute><ListCar/></PrivateRoute>} />
          <Route path={"listappareil"} element={<PrivateRoute><ListAppareil/></PrivateRoute>} />
          <Route path='listcompanie' element={<PrivateRoute><ListCompany  openMenu={openMenu} setOpenMenu={setOpenMenu} showModal={showModal} setShowModal={setShowModal} /></PrivateRoute>} />
          <Route path={'updatecompanie/:id'} element={<PrivateRoute><AddClient/></PrivateRoute>} />
          <Route  path={'updatearticle/:id'} element={<PrivateRoute><AddArticle/></PrivateRoute>} />
          <Route  path={'updatecar/:id'} element={<PrivateRoute><AddVehicule/></PrivateRoute>} />
          <Route path={"editappareil/:id"} element={<PrivateRoute><AddAppareil/></PrivateRoute>} />
          <Route  path={'devis/:id'} element={<PrivateRoute><Devis /></PrivateRoute>} />
        </Route>
      </Routes>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover
theme="colored"
bodyClassName="toast-message-body"
style={{width:'700px'}}
/>
{isLoading && <Loading />}
{(showModal.name==="ModalUser" && showModal.status===true) && <ModalCompanie setShowModal={setShowModal} showModal={showModal}/>}
{(showModal.name==="listVehicule" && showModal.status===true) && <ModalCompanie setShowModal={setShowModal} showModal={showModal}/>}
{(showModal.name==="listFacture" && showModal.status===true) && <ModalCompanie setShowModal={setShowModal} showModal={showModal}/>}
 {showAlert && <AlertModal setShowAlert={setShowAlert} qtyId={qtyId}/>}
 {open && <ShowModal  productId={productId} open={open} setOpen={setOpen} />}    
    </BrowserRouter>
  </>
  );
}

export default App;
