import React , {useEffect}from 'react'
import { Table } from 'antd';
import TextAnnimation from '../TextAnnimatioon';
import { useDispatch, useSelector } from 'react-redux';
import { allfactures, generateFactures } from '../../features/factureSlice';
import { companies } from '../../features/companieSlice';
import './style.css'
const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'numero Facture',
        dataIndex: 'numeroFacture',
       
    },
    {
        title: 'date Debut',
        dataIndex: 'dateDebut',
    },
    {
        title: 'date Fin',
        dataIndex: 'dateFin',
    },
    {
        title:'Etat',
        dataIndex:'etat'
    },
   
    {
        title:"Companie",
        dataIndex:"client"

    },
    {
title:'Appareils',
dataIndex : 'Appareils'
    },
    {
        title:"Totale",
        dataIndex:"totale"
    }
 
];

const ListFacturesCompanie = () => {
    const dispatch = useDispatch()
    const {companie} = useSelector(state=>state?.companie)
    const limitPagination = {
        pageSize:3
      } 
  
    const { facture, isLoading } = useSelector(state => state?.fact);
    const _data = [];
    
 
    
        for (let i = 0; i < facture.length; i++) {
          const totalQuantity = facture[i]?.appareilId?.reduce((acc, appareil) => {
            return (acc + appareil.priceUnite);
          }, 0);
          let totaleContent;
          if (i === 0) {
            // Display this content for the first facture
            totaleContent = (
              <>
                <p>Prix Device: {" "}{totalQuantity} </p>
                <p>Appareil Facturation: {" "}{facture?.reduce((acc, app) => { return (acc + app.priceUnitaire) }, 0) * facture[i]?.appareilId?.length}</p>
                <p><hr />
                  {totalQuantity + (facture?.reduce((acc, app) => { return (acc + app.priceUnitaire) }, 0) * facture[i]?.appareilId?.length)} TND
                </p>
              </>
            );
          } else {
            // Display a different content for subsequent factures
            totaleContent = facture?.length + "X 20    = " + facture?.length*20+ "  TND" ;
          }
          _data.push({
            key: i + 1,
            numeroFacture: facture[i]?.numeroFacture,
            dateDebut: facture[i]?.dateDebut,
            dateFin: facture[i]?.dateFin,
            etat: <span style={{ fontWeight: "700" }}>{facture[i]?.etat}</span>,
            client: facture[i]?.clientId?.nomComplet,
            Appareils: facture[i]?.appareilId?.map((app, index) => (
              <div key={index}>{app?.code}</div>
            )),
            totale:totaleContent
          })
        }
      
  
    
    return (
      <>
        <div className='container my-5'>
          <div className='qqq d-flex justify-content-between align-items-center p-3 bg-primary text-light' style={{ width: '100%' }}>
            <div> <h6><TextAnnimation text={'LIST FACTURES'} /></h6></div>
          </div>
          <Table columns={columns} dataSource={_data} pagination={limitPagination} />
        </div>
      </>
    )
}

export default ListFacturesCompanie