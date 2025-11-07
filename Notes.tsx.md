1️⃣ Project Setup

Pehle ek new folder banao apne project ke liye.

Terminal ya VS Code open karo us folder ke andar.

npm init -y likho taake ek package.json file ban jaye.

Ab Express, Mongoose, EJS, aur Method-Override install karo.

Nodemon ko dev dependency ke tor par install karo (auto restart ke liye).

package.json me script likho "start": "nodemon app.js"

👉 Is step ke baad, project ke andar basic setup ready hoga.

⚙️ 2️⃣ Folder Structure

Ek clean structure banana zaroori hai:

models/ → Mongoose schemas ke liye

routes/ → saare Express routes ke liye

views/ → EJS templates ke liye

public/ → CSS, images, JS, favicon, etc. ke liye

Ye folder structure maintain karna future debugging aur styling me madad karega.

👉 Is step ke baad, tumhara project organized hoga.

🌐 3️⃣ app.js (Main Server File)

Express app create karni hai.

MongoDB se connect karna hai.

Middleware lagana hai (URL encoding, static files, method override).

Routes ko import karna hai.

Server ko run karna hai on port 3000.

👉 Is ke baad server local machine par run karne ke liye ready ho jata hai.

🧩 4️⃣ Database (MongoDB)

Ek Mongoose schema banana hai jisme fields hon:

title, description, image, price, location, country

Ye model MongoDB ke collection me listings store karega.

Database ka naam rakho airbnbClone.

👉 Is ke baad tum data MongoDB me store aur retrieve kar sakte ho.

🚀 5️⃣ Routes Setup

Routes ko separate file me likhna best practice hai.

Routes honge:

GET /listings → sab listings dikhana

GET /listings/new → nayi listing ka form

POST /listings → nayi listing create karna

GET /listings/:id → ek specific listing dekhna

GET /listings/:id/edit → edit form

PUT /listings/:id → update karna

DELETE /listings/:id → delete karna

👉 Is step ke baad, poora CRUD (Create, Read, Update, Delete) system ready hoga.

🖼️ 6️⃣ Views (EJS Templates)

EJS ke andar HTML + dynamic JS data likh sakte ho.

Views folder ke andar:

index.ejs → sab listings ka page

show.ejs → ek listing ka detailed view

new.ejs → new listing form

edit.ejs → edit form

partials/ folder me header.ejs & footer.ejs reusable parts ke liye

👉 Is ke baad front-end aur back-end connected ho jayenge.

🎨 7️⃣ Styling (CSS / Bootstrap)

Bootstrap CDN link header me add karo.

Apni custom CSS file public/css/style.css me banao.

Card hover, image transition aur colors customize karo (Airbnb style pink #ff385c use karo).

Form ko center align karo aur responsive design rakho.

👉 Is ke baad website visually attractive lagne lagegi.

🧠 8️⃣ Footer & Navbar

Header aur footer ko partials folder me rakho.

Header me navigation links rakho: Home, New Listing, About.

Footer me copyright, contact info, aur Airbnb-style pink theme use karo.

Har page par include karo <%- include('partials/footer') %>

👉 Is ke baad sab pages ka layout consistent ho jayega.

🖼️ 9️⃣ Images Setup

Public folder me ek images folder banao.

Sab downloaded images wahan rakho.

Database me image: "/images/filename.jpg" likho taake static route se load ho.

app.use(express.static(path.join(\_\_dirname, 'public'))); zaroor likho.

👉 Is ke baad images properly load hone lagenge (no broken links).

💾 🔟 Environment Variables (.env)

Database URL, secret keys, aur ports .env file me rakho.

require('dotenv').config() app.js ke start me likho.

.env me likho:

MONGO_URL=mongodb://127.0.0.1:27017/airbnbClone
PORT=3000

.env file ko .gitignore me add karna mat bhoolna.

👉 Is ke baad sensitive info safe ho jati hai.

🧹 1️⃣1️⃣ Seeding Data (Optional)

Agar manually listings banana boring lagta hai to ek “seed script” banao.

Usme dummy data daal kar MongoDB me insert karo.

Ye step project testing me helpful hota hai.

🧭 1️⃣2️⃣ Favicon Add Karna

Ek small logo ya icon (32x32px PNG) banao.

Usse public/images/favicon.png me rakho.

HTML ke <head> me likho:

<link rel="icon" type="image/png" href="/images/favicon.png">

👉 Is ke baad browser tab me icon show hone lagega.

⚡ 1️⃣3️⃣ Final Touches

Delete aur Edit buttons ko visually separate colors do:

Edit → #007BFF (blue)

Delete → #e63946 (dark pinkish-red)

Loading slow hai to:

Images compress karo

CSS aur JS minify karo

Local MongoDB use karo instead of Atlas (for testing)

🏁 1️⃣4️⃣ Run Project

Command: npm start

Open browser: http://localhost:3000/listings

Create, Edit, Delete, aur View functionality test karo.

💡 1️⃣5️⃣ Backup Tips

Hamesha apne code ko GitHub par push karo.

Ya kam se kam .zip backup le lo har din ka.

Notepad me notes likhne ke bajaye VS Code me markdown file (notes.md) banao —
usme autosave aur version control dono hota hai.

==============================================================================

enctype="multipart/form-data">

kisi b input sa files ya pdf file layna ya use hota ha
