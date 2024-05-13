import { Navigate, useRoutes } from "react-router-dom";
import Acceuil from './pages/Acceuil'
import DashboardLayout from './Layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Users from "./pages/Users";
import Conge from "./pages/Conge";
import Accueil from './pages/Accueil'
import Listeusers from "./pages/Listeusers"
import PublicRoutesLayout from "./Layouts/PublicRoutesLayout";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import PermessionTable from "./pages/PermissionTable"
import DetailUser from "./pages/DetailUser"
import Acces from "./pages/Acces"
import Author from "./pages/Author"
import CongeAccepter from "./pages/CongeAccepter"
import AuthparEmail from "./pages/AuthparEmail"
import Mession from "./pages/Mission"
import Printpdf from "./pages/Printpdf"
import Compensation from "./pages/Compensation"
import ListCompensation from "./pages/ListCompensation"
import Settings from "./pages/Settings";
import Acceptecomp  from "./pages/AcceptComp";
import { isAuthenticated } from './auth/auth';
import Acceptspec from './pages/AcceptSpec'
import AjoutSpec from './pages/AjoutCgS';
import  AccepteMaladie from './pages/AcceptMaladie';
import Listemaladie from './pages/Listemaladie';
import AjoutMaladie from './pages/AjoutMaladie';
import Calendar from './pages/Calendar';
import Salaire from './pages/Salaire';
import ListeSpecial from './pages/ListeSpeciale'
import ForgetPassword from './pages/ForgetPassword'
import AddCongeComp from './pages/AddCongeComp'
import MonCongeComp from './pages/MonCongeComp'
import AcceptCongeCompensation from './pages/AcceptCongeCompensation'
import Suivie from './pages/Stocks/Suiviedemande'
import BonEnter from './pages/Stocks/BonEntrer'
import DashStocks from './pages/Stocks/DashStocks'
import Etatstocks from './pages/Stocks/EtatStocks'
import SortieArticle from './pages/Stocks/SortieArticle'
import GetBonEnter from './pages/Stocks/GetBonEnter'
import Transfere from './pages/Stocks/Transfere'
import Pageprint  from './pages/Stocks/PAGEPRINT'

import Invenntaire from './pages/Stocks/Inventaire'
import AddEmp  from './pages/SiteWeb/AddEmp'
import AddEvent  from './pages/SiteWeb/AddEvent'
import ListeEmp  from './pages/SiteWeb/ListeEmp'
import Stage  from './pages/SiteWeb/Stage'
import AccepterStage from './pages/SiteWeb/CondidatSpontane/AccepterStage'
import Accepteroffreemploi from './pages/SiteWeb/CondidatSpontane/AccepterOffreemploi'
import AccepterSpontane from './pages/SiteWeb/CondidatSpontane/AccepterSpontane'
import DemandeAccepterSpontane from './pages/SiteWeb/CondidatSpontane/ListeAccepter'
import Contact from './pages/SiteWeb/Contact'

import Jourfrier from './pages/JourFrier'
import Departements from './pages/AjoutDepart'
import Chefdequipes from './pages/ChefEquipe'

export default function Router()

{
 const isLoggedIn = isAuthenticated();
  
    return useRoutes([
      {
        path: "/app",
        element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/" replace={true} />,
        children: [
          { path: "Contact", element: isLoggedIn ? <Contact /> : <Navigate to="/" replace={true} /> },
          { path: "Spontane", element: isLoggedIn ? <AccepterSpontane /> : <Navigate to="/" replace={true} /> },
          { path: "SpontaneAccepter", element: isLoggedIn ? <DemandeAccepterSpontane /> : <Navigate to="/" replace={true} /> },
          { path: "Accepterdemande", element: isLoggedIn ? <AccepterStage /> : <Navigate to="/" replace={true} /> },
          { path: "Accepterdemandedemploi", element: isLoggedIn ? <Accepteroffreemploi /> : <Navigate to="/" replace={true} /> },



          { path: "Pageprint", element: isLoggedIn ? <Pageprint /> : <Navigate to="/" replace={true} /> },
          { path: "Accueil", element: isLoggedIn ? <Accueil /> : <Navigate to="/" replace={true} /> },
          { path: "Suivie", element: isLoggedIn ? <Suivie /> : <Navigate to="/" replace={true} /> },
          { path: "Etatstocks", element: isLoggedIn ? <Etatstocks /> : <Navigate to="/" replace={true} /> },
          { path: "Transfere", element: isLoggedIn ? <Transfere /> : <Navigate to="/" replace={true} /> },
          { path: "BonEnter", element: isLoggedIn ? <BonEnter /> : <Navigate to="/" replace={true} /> },
          { path: "GetBonEnter", element: isLoggedIn ? <GetBonEnter /> : <Navigate to="/" replace={true} /> },
          { path: "DashStocks", element: isLoggedIn ? <DashStocks /> : <Navigate to="/" replace={true} /> },
          { path: "SortieArticle", element: isLoggedIn ? <SortieArticle /> : <Navigate to="/" replace={true} /> },
          { path: "AddCongeComp", element: isLoggedIn ? <AddCongeComp /> : <Navigate to="/" replace={true} /> },
          { path: "MonCongeComp", element: isLoggedIn ? <MonCongeComp /> : <Navigate to="/" replace={true} /> },
          { path: "AcceptCongeCompensation", element: isLoggedIn ? <AcceptCongeCompensation /> : <Navigate to="/" replace={true} /> },
          { path: "ListCompensation", element: isLoggedIn ? <ListCompensation /> : <Navigate to="/" replace={true} /> },

          { path: "dashboard", element: isLoggedIn ? <Dashboard /> : <Navigate to="/" replace={true} /> },
          { path: "calendar", element: isLoggedIn ? <Calendar /> : <Navigate to="/" replace={true} /> },
          { path: "listeusers", element: isLoggedIn ? <Listeusers /> : <Navigate to="/" replace={true} /> },
          { path: "ajoutSpec", element: isLoggedIn ? <AjoutSpec /> : <Navigate to="/" replace={true} /> },
          { path: "listespecial", element: isLoggedIn ? <ListeSpecial /> : <Navigate to="/" replace={true} /> },
          { path: "Listemaladie", element: isLoggedIn ? <Listemaladie /> : <Navigate to="/" replace={true} /> },

          { path: "acceptspec", element: isLoggedIn ? <Acceptspec /> : <Navigate to="/" replace={true} /> },
          { path: "conge", element: isLoggedIn ? <Conge /> : <Navigate to="/" replace={true} /> },
          { path: "DetailUser", element: isLoggedIn ? <DetailUser /> : <Navigate to="/" replace={true} /> },
          { path: "users", element: isLoggedIn ? <Users /> : <Navigate to="/" replace={true} /> },
          { path: "acces", element: isLoggedIn ? <Acces /> : <Navigate to="/" replace={true} /> },
          { path: "profile", element: isLoggedIn ? <PermessionTable /> : <Navigate to="/" replace={true} /> },
          { path: "compensation", element: isLoggedIn ? <Compensation /> : <Navigate to="/" replace={true} /> },
          { path: "acceptcompensation", element: isLoggedIn ? <Acceptecomp /> : <Navigate to="/" replace={true} /> },  
          { path: "ajoutmaladie", element: isLoggedIn ? <AjoutMaladie /> : <Navigate to="/" replace={true} /> },
                { path: "settings", element: isLoggedIn ? <Settings /> : <Navigate to="/" replace={true} />},
                { path: "acceptmaladie", element: isLoggedIn ? <AccepteMaladie /> : <Navigate to="/" replace={true} /> }, 
               { path: "author", element: isLoggedIn ? <Author /> : <Navigate to="/" replace={true} />},
               { path: "authparEmail", element: isLoggedIn ? <AuthparEmail /> : <Navigate to="/" replace={true} /> },
               { path: "congeaccepter", element: isLoggedIn ? <CongeAccepter />: <Navigate to="/" replace={true} /> },
               { path: "mession", element: isLoggedIn ? <Mession /> : <Navigate to="/" replace={true} /> },
               { path: "print", element:  isLoggedIn ? <Printpdf /> : <Navigate to="/" replace={true} /> },
               { path: "salaire", element:  isLoggedIn ? <Salaire /> : <Navigate to="/" replace={true} /> },
               { path: "jourfrier", element: isLoggedIn ? <Jourfrier /> : <Navigate to="/" replace={true} /> },
               { path: "departements", element: isLoggedIn ? <Departements /> : <Navigate to="/" replace={true} /> },
               { path: "chefequipes", element: isLoggedIn ? <Chefdequipes /> : <Navigate to="/" replace={true} /> },


               { path: "ListeEmp", element:  isLoggedIn ? <ListeEmp /> : <Navigate to="/" replace={true} /> },
               { path: "AjoutEvent", element:  isLoggedIn ? <AddEvent /> : <Navigate to="/" replace={true} /> },
               { path: "AjoutEmp", element:  isLoggedIn ? <AddEmp /> : <Navigate to="/" replace={true} /> },
               { path: "Stage", element: isLoggedIn ? <Stage /> : <Navigate to="/" replace={true} /> },
               { path: "inventaire", element: isLoggedIn ? <Invenntaire /> : <Navigate to="/" replace={true} /> },


        ],
      },
      {
        path: "/",
        element: isLoggedIn ? <Navigate to="/app/Accueil" replace={true} /> : <PublicRoutesLayout />,
        children: [
          { index: true, element: <Login /> },
          { path: "login", element: <Login /> },
          { path: "page404", element: <Page404 /> },
          { path: "forgetpassword", element: <Users /> },
        ],
      },
      { path: "a", element: <Acceuil /> },
    ]);
  }