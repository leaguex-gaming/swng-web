### swng

### Tech Stack

- Next Js (App routing - React Server Components - RSC)
- react-native-web (For styling, because we built the mobile app using react native. So we can use same style component if we use react-native-web)
- @reduxjs/toolkit (For global store)

### To run project

- npm install
- npm run dev

### To add new local fonts

- Add font file(.ttf) to root public folder (public/fonts)
- Add below code to root layout

      const fontName = localFont({
           src: "../../public/fonts/fontName.ttf",
           display: "swap",
           variable: "--font-fontName",
      });

- Add font variable to html body's className
- config font to tailwind.config.js
- You can use added fonts by using tailwind styles with mentioned name.

### To add svg

- Change your svg file to svg component `<link>` : <https://react-svgr.com/playground/>
- Add your file svg folder (public/svg)
