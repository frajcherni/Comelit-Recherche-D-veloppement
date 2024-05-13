import React from 'react';
import { Document, Page,Image, Text, View, StyleSheet,Path } from '@react-pdf/renderer';

const ArticlePdf = ({ bonEntree }) => {
  const styles = StyleSheet.create({
    square: {
        width: 200,
        height: 70,
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    table: { 
        display: "table", 
        width: "80%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        
        borderRightWidth: 1, 
        borderBottomWidth: 1 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "20%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 1, 
        borderTopWidth: 1 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      },
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 20,
      fontSize: 14,
    },
    section: {
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    value: {
      marginRight: 10,
    },
    taable: {
        display: "table",
        width: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      },
      taableRow: {
        flexDirection: "row"
      },
      taableCol1: {
        width: "30%",
        
        padding: "5px"
      },
      taableCol2: {
        width: "70%",
        padding: "5px"
      },
      tableFooter: {
        textAlign: 'right',
        padding: '10px',
        fontWeight: 'bold',
        borderTop: '2px solid black',
      },
      footer: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        fontSize: 10,
        justifyContent: 'left',
       
      },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'left',
        flexGrow: 1,
       
      },
      footerText: {
        textAlign: 'left',
       
      },
      footerTextCenter: {
        textAlign: 'center',
        
      },
      footerTextRight: {
        textAlign: 'right',
        
      },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.section}>
       
       
       <Image src="/img/comelitnoir.png" style={{ paddingLeft:30, paddingTop:2 ,height: 100, width: 200 }} />
       <View >
            <Text style={{  paddingTop:3 ,paddingLeft:450, fontSize: 15 }}>FACTURE</Text>
          </View>
         <hr style={{border:"1px solide black"}}></hr>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ width: '100%' ,fontSize:'10px' }}>
          
            <View style={styles.taable}>

<View style={styles.taableRow}>
  <View style={styles.taableCol1}>
    <Text>Facture N°:</Text>
  </View>
  <View style={styles.taableCol2}>
    <Text> {bonEntree.numFacture}</Text>
  </View>
</View>
<View style={styles.taableRow}>
  <View style={styles.taableCol1}>
    <Text>Date :</Text>
  </View>
  <View style={styles.taableCol2}>
    <Text>  {bonEntree.dateFacture}</Text>
  </View>
</View>
<View style={styles.taableRow}>
  <View style={styles.taableCol1}>
    <Text>code Client :</Text>
  </View>
  <View style={styles.taableCol2}>
    <Text> A</Text>
  </View>
</View>
<View style={styles.taableRow}>
  <View style={styles.taableCol1}>
    <Text>Num TVA:</Text>
  </View>
  <View style={styles.taableCol2}>
    <Text> A</Text>
  </View>
</View>
<View style={styles.taableRow}>
  <View style={styles.taableCol1}>
    <Text>code Article:</Text>
  </View>
  <View style={styles.taableCol2}>
    <Text> A</Text>
  </View>
</View>
</View>
            </View>
        <View></View>
            <View style={{ width: '80%' ,marginTop: 5 }} >
           
            <View style={styles.square}>
          <Text style={{ fontSize:'8px' }}> CRED COMELIT RECHERCHE & DEVLOPPEMENT</Text>
              <Text style={{ fontSize:'8px' , textAlign:'left' }}> Bloc Bp 30 BLOC 1</Text>
              <Text style={{ fontSize:'8px' }}> Pole Technologique 1</Text>
              <Text style={{ fontSize:'8px' }}> ELGHAZELA</Text>
              <Text style={{ fontSize:'8px' }}> 2088  Ariana    TN</Text>
              <Text style={{ fontSize:'8px' }}> Tunisia </Text>
      </View>
            </View>

            

            
          </View>
         
                

        </View>
        <View style={styles.table}> 

        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Article</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Description</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>QTE</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Prix net</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Total</Text> 
          </View>
          <View style={styles.tableCol }> 
            <Text style={styles.tableCell}>aa</Text> 
          </View>
         
        </View>
        {bonEntree.articles.map((article) => (
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{article.codeArticle}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{article.designation}</Text> 
          </View> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{article.qte}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{article.prix}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{article.coutAchat}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{article.coutAchat}</Text> 
          </View>
        
       </View>
       ))}
        </View>
        <Text style={{position: "absolute",
      bottom: 110,
      left: 20,
      right: 20,
      fontSize: 10,color:'#0FA66D'
      }}> COMELIT RECHERCHE ET DEVLOPPEMENT  ................................................................................................................ </Text>
      <View style={styles.footer}>
      <View style={styles.footerContainer}>
      
      <View style={{ flexDirection: 'column', alignItems: 'left' }}>
        <Text style={[styles.footerText, styles.footerTextLeft]}>SARL au capital de 6000 TND Siege </Text>
        <Text style={[styles.footerText, styles.footerTextLeft]}>social Pole Technologie El Ghazela Bloque E1</Text>
        <Text style={[styles.footerText, styles.footerTextLeft]}>RDC Route de Raoud 2088 Ariana| Tunisie </Text>
         </View>
         <View style={{ flexDirection: 'column', alignItems: 'left' }}>
        <Text style={[styles.footerText, styles.footerTextCenter]}>MF : 1378354 A/A/M/00</Text>
        <Text style={[styles.footerText, styles.footerTextCenter]}>RC : B01247692014 </Text>
        <Text style={[styles.footerText, styles.footerTextCenter]}>T + 216 70 834 125 </Text>
        <Text style={[styles.footerText, styles.footerTextCenter]}>F + 216 70 834 126 </Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'left' }}>
        <Text style={[styles.footerText, styles.footerTextRight]}>CCB:Agence UBCI Raoud</Text>
        <Text style={[styles.footerText, styles.footerTextRight]}>RIB:11 053 0050028 034 978 55</Text>
        <Text style={[styles.footerText, styles.footerTextRight]}>web:www.comelitgroupe.comelit</Text>
        <Text style={[styles.footerText, styles.footerTextRight]}>E-mail:cred@comelit.it</Text>
      </View>
      
      </View>
     
    </View>
    <Text style={{position: "absolute",
      bottom: 35,
      left: 25,
      right: 20,
      fontSize: 12,color:'#0FA66D'
      }}> www.comelitgroupe.com  ........................................................................................................................ </Text>
    </Page>
    
    </Document>
  );
};

export default ArticlePdf;