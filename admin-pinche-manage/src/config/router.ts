import { lazy, Suspense } from "react";
import LayoutMaster from "../layouts/LayoutMaster";

const Certification = lazy(() => import("../pages/Certification/Certification"))
const OwnerCertification = lazy(() => import("../pages/OwnerCertification/OwnerCertification"))

// export const routes = [
//   {
//     path: "/",
//     element: <LayoutMaster />,
//     children: [
//       {
//         path: "/certification",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <Certification />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/ownerCertification",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <OwnerCertification />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ];
