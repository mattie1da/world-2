import { fetchAPI } from "./api";

export const getGlobalSettings = async () => {
   const globalSettingsData = await fetchAPI("/global", {
      populate: {
         defaultSeo: {
            populate: "*",
         },
      },
   });

   const { siteName, favicon, defaultSeo } = globalSettingsData.data.attributes;
   const resolvedData = {
      siteName: siteName,
      defaultSeo: {
         metaDescription: defaultSeo.metaDescription,
         metaTitle: defaultSeo.metaTitle,
      }
   }

   return resolvedData;
}