const fs = require("fs");
// const globby = require("globby");
// import fs from "fs";
// import globby from "globby";

function addPage(page) {
  const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "");
  const route = path === "index" ? "" : path;

  return `  <url>
    <loc>${`${process.env.BASE_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
        "api",
        "404.js",
        "500.js",
        "create.js",
        "edit_user.js",
        "order.js",
        "users.js",
        "verify-email.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${staticPagePath}`;
      // vercel use automatic trailing Slash
      // return `/${staticPagePath}`; NO NEED if use Vercel
    });

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${pages.map(addPage).join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSitemap();
