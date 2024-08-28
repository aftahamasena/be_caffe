const express = require(`express`);
const app = express();
const PORT = 3036;
const cors = require(`cors`);
const bodyParser = require ("bodyParser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
const userRoute = require('./routes/user.route');
app.use(`/user`, userRoute);
const mejaRoute = require('./routes/meja.route');
app.use(`/meja`, mejaRoute);
const transaksiRoute = require('./routes/transaksi.route');
app.use(`/transaksi`, transaksiRoute);
const menuRoute = require('./routes/menu.route');
app.use(`/menu`, menuRoute);
const detail_transaksiRoute = require('./routes/detail_transaksi.route');
app.use(`/detail_transaksi`, detail_transaksiRoute);

app.listen(PORT, () => {
  console.log(`Server of Sena's Cafe runs on port  ${PORT}`);
});
