# How to Test the Easter Egg Animation 🧪

## Prerequisites
1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in your browser

---

## Testing Steps

### **Method 1: Keyboard Trigger**
1. Click anywhere on the page
2. Type the letters: `a` `w` `s` (in sequence)
3. Easter egg should trigger immediately!

### **Method 2: Input Box Trigger**
1. Find the "Generate Your Invitation" input box
2. Start typing "aws" in the input
3. Easter egg triggers when you complete typing "aws"

---

## What You Should See

### **Timeline:**
1. **0.0s** - Screen darkens, golden dot appears center
2. **0.2s** - Dot starts rotating 360°
3. **0.7s** - Explodes into terminal window
4. **1.1s** - Terminal provisioning text starts typing
5. **4.0s** - System overload (turns red, shakes)
6. **5.5s** - Window shatters in two pieces
7. **6.0s** - AWS smile appears
8. **9.0s** - Redirects to `/recruitment`

---

## Mobile Testing 📱

### **Chrome DevTools Method:**
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select a mobile device (iPhone 12, Galaxy S21)
4. Refresh page
5. Trigger Easter egg

### **Real Device Method:**
1. Find your local IP: `ipconfig` (look for IPv4)
2. On phone, connect to same WiFi
3. Open browser: `http://[YOUR_IP]:3000`
4. Trigger Easter egg

### **Expected on Mobile:**
- ✅ Smooth 60fps animation
- ✅ No sidebar visible
- ✅ Text fits perfectly
- ✅ No horizontal scrolling
- ✅ Crisp, clear text
- ✅ Shake effect is controlled (3 times)
- ✅ Smile appears properly sized

---

## Desktop Testing 🖥️

### **Expected on Desktop:**
- ✅ All effects same as before
- ✅ Sidebar with CPU/RAM/Network metrics visible
- ✅ Larger terminal window
- ✅ Fuller text size
- ✅ Everything smooth

---

## Troubleshooting

### **Easter Egg Doesn't Trigger**
- Make sure you're typing "aws" (all lowercase)
- Try refreshing the page
- Check browser console for errors (F12)

### **Animation is Choppy**
- Check if you have multiple tabs open
- Close other applications
- Try incognito mode
- Clear browser cache

### **MongoDB Error**
- This is expected (you saw it before)
- Easter egg will still work
- Only affects invitation generation feature

---

## Quick Test Command

If dev server isn't running:
```bash
npm run dev
```

Then visit: **http://localhost:3000**

Type: **aws**

Enjoy the show! 🎬
