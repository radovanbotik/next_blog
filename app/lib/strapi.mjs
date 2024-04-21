import qs from "qs";
const url = `http://localhost:1337/api/articles?${qs.stringify(
  {
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 6 },
    sort: ["publishedAt:desc"],
  },
  { encodeValuesOnly: true }
)}`;
const response = await fetch(url);
const data = await response.json();
// console.log(JSON.stringify(data, null, 2));
// console.log(url);
// console.log(data);

const query = `http://localhost:1337/api/articles?${qs.stringify(
  {
    filters: {
      slug: {
        $eq: "slug",
      },
    },
    populate: { image: { fields: ["url"] } },
  },
  { encodeValuesOnly: true }
)}`;
