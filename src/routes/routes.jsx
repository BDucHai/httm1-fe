import Home from "../pages/Home";
import Mau from "../pages/Mau";
import Model from "../pages/Model";

import Nhan from "../pages/Nhan";
import AddModel from "../pages/AddModelBien";
import ModifierMauBien from "../pages/ModifierMauBien";
import ModifierNhanBien from "../pages/ModifierNhanBien";
import MauDenVach from "../pages/MauDenVach";
import ModifierMauDenVach from "../pages/ModifierMauDenVach";
import NhanDenVach from "../pages/NhanDenVach";
import ModelDenVach from "../pages/ModelDenVach";
import AddModelDenVach from "../pages/AddModelDenVach";
import ModifierNhanDen from "../pages/ModifierNhanDen";
import ModifierNhanVach from "../pages/ModifierNhanVach";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/mau/bien", component: Mau },
    { path: "/mauType/:type", component: MauDenVach },
    { path: "/modifier/mau/bien/:id", component: ModifierMauBien },
    { path: "/modifier/mauType/:type/:id", component: ModifierMauDenVach },
    { path: "/nhan/bien", component: Nhan },
    { path: "/nhanType/:type", component: NhanDenVach },
    { path: "/modifier/nhan/bien/:id", component: ModifierNhanBien },
    { path: "/modifier/nhanden/:id", component: ModifierNhanDen },
    { path: "/modifier/nhanvach/:id", component: ModifierNhanVach },
    { path: "/model/:type", component: Model },
    { path: "/modelType/:type", component: ModelDenVach },
    { path: "/addModel/bien", component: AddModel },
    { path: "/addModelType/:type", component: AddModelDenVach },
];

export { publicRoutes };
