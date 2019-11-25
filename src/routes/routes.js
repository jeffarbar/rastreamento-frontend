import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Login from "@/pages/Login.vue";
import Registro from "@/pages/Registro.vue";
import AlteracaoSenha from "@/pages/AlteracaoSenha.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import PontoMonitorado from "@/pages/PontoMonitorado.vue";
import TipoPontoMonitorado from "@/pages/TipoPontoMonitorado.vue";
import Modelo from "@/pages/Modelo.vue";
import Dispositivo from "@/pages/Dispositivo.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [ 
  {
    path: "/",
    component: Login,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "login"
      }
    ]
  },
  {
    path: "/",
    component: Registro,
    redirect: "/registro",
    children: [
      {
        path: "registro",
        name: "registro"
      }
    ]
  },
  {
    path: "/",
    component: AlteracaoSenha,
    redirect: "/alteracaoSenha",
    children: [
      {
        path: "alteracaoSenha/:chave",
        name: "alteracaoSenha"
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "Usuário",
        component: UserProfile
      },
      {
        path: "pontomonitorado",
        name: "Ponto Monitorado",
        component: PontoMonitorado
      },
      {
        path: "dispositivo",
        name: "Dispositivo",
        component: Dispositivo
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps/:idPontoMonitorado",
        name: "Mapa",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "maps",
        name: "Mapa",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "tipopontomonitorado",
        name: "Tipo Ponto Monitorado",
        component: TipoPontoMonitorado
      },
      {
        path: "modelo",
        name: "Modelo",
        component: Modelo
      }
    ]
  }
];

export default routes;
