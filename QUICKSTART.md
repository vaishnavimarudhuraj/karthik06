# 🚀 Quick Start Guide

Get the Herbal E-Commerce platform up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB running (local or MongoDB Atlas)
- Stripe account with test keys

## 1️⃣ Clone & Setup (2 minutes)

### Backend
```bash
cd backend
npm install
cp .env.example .env

# Edit .env file with:
MONGODB_URI=mongodb://localhost:27017/herbal-ecommerce
JWT_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_your_key
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env

# Edit .env file with:
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

## 2️⃣ Start Services (1 minute)

### Terminal 1 - MongoDB
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, skip this step
```

### Terminal 2 - Backend
```bash
cd backend
npm run dev
# ✅ Server running on http://localhost:5000
```

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
# ✅ App running on http://localhost:5173
```

## 3️⃣ Access the App (1 minute)

1. Open `http://localhost:5173` in your browser
2. Click "Sign up" to create an account
3. Enjoy shopping!

## 4️⃣ Test Payment (1 minute)

Use this test card for checkout:
- **Card**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)

## ✅ Quick Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env files configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173

## 🚀 Deployment Steps

You must complete these steps manually on your machine before the site is live:

1. **Push the repository**
   ```powershell
   cd C:\Users\Dell\Desktop\HERBAL
   git push -u origin main
   ```
   Authenticate with GitHub using your credentials or a personal access token.

2. **Deploy the backend** to a hosting service (Heroku, Railway, etc.) and note the public URL.

3. **Install & login to Vercel**
   ```powershell
   npm install -g vercel
   vercel login
   ```

4. **Link and deploy the frontend**
   ```powershell
   cd frontend
   vercel link      # select account/project
   vercel env add VITE_API_URL production https://your-backend-url/api
   vercel env add VITE_STRIPE_PUBLIC_KEY production pk_live_...
   vercel --prod
   ```

5. Verify the site is live at `https://<your-vercel-project>.vercel.app`.

Once done, future pushes to **main** auto-trigger deployments.

## 🎯 What to Try First

1. **Browse Products**
   - Go to Products page
   - Try searching for "herb"
   - Filter by category or price

2. **Create Account**
   - Register with your email
   - Fill in all required fields

3. **Shopping Experience**
   - Add products to cart
   - Try adding to wishlist
   - Proceed to checkout

4. **Test Payment**
   - Complete checkout with test card
   - Confirm order

5. **Become a Farmer** (Optional)
   - Go to Profile
   - Click "Apply as Farmer"
   - Fill farm details

6. **Admin Features** (Optional)
   - Set user role to "admin" in database
   - Visit `/admin` dashboard

## 📱 Mobile Testing

Open `http://localhost:5173` on your phone or use browser dev tools:
- Chrome DevTools: `F12` → Device Toggle (`Ctrl+Shift+M`)
- responsive design testing

## 🌓 Dark Mode

Click the moon/sun icon in top navigation to toggle dark mode!

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Kill process on port 5000 (macOS/Linux)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Change port in backend server.js if needed
```

### Database connection error
```bash
# Verify MongoDB is running
mongo connection-string

# Or use MongoDB Compass to test connection
```

### Frontend shows API error
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check .env has correct API URL
# Clear browser cache: Ctrl+Shift+Delete
```

### Port already in use
```bash
# Change frontend port in vite.config.js
# Change backend port in .env (PORT=5001)
```

## 📚 Learn More

- **Backend Docs**: `./backend/README.md`
- **Frontend Docs**: `./frontend/README.md`
- **Full Features**: `./FEATURES.md`
- **Setup Guide**: `./SETUP.md`
- **Main README**: `./README.md`

## 🎓 Key Features to Explore

✨ **Must Try**:
- Dark mode toggle
- Product search & filters
- Shopping cart
- Payment with Stripe
- Order tracking
- Farmer profiles

🔧 **For Developers**:
- Authentication system
- State management with Zustand
- API integration with Axios
- Component animations

## 💡 Tips & Tricks

1. **Fast Reload**: Changes auto-reload in both frontend and backend
2. **Database Queries**: Use MongoDB Compass for visual DB exploration
3. **API Testing**: Import `./backend/api-collection.postman.json` in Postman
4. **Console Debugging**: Open browser DevTools (`F12`) to see network requests
5. **Local Storage**: Check browser DevTools → Application → Storage

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env or kill process |
| DB connection fails | Verify MongoDB connection string |
| API errors | Check backend logs in terminal |
| Cart not showing | Clear browser cache |
| Dark mode not working | Refresh page |

## 📞 Need Help?

1. Check README files in backend and frontend folders
2. Review error messages in browser console (`F12`)
3. Check backend terminal for API errors
4. Check MongoDB Atlas dashboard if using cloud

## ✨ What's Next?

After setup:
1. Explore the codebase
2. Customize styling with Tailwind
3. Add new features
4. Deploy to production
5. Set up monitoring

---

**You're all set! Happy coding! 🎉**

*Need advanced setup? Check `SETUP.md` for detailed instructions.*
