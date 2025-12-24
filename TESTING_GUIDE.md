# 🎯 Quick Testing Guide - Mobile Enhancements

## ⚡ 30-Second Test

### Desktop:
1. Open `http://localhost:3000`
2. **Triple-click** AWS logo (top-left)
3. Watch animation
4. After 2 seconds, see "Tap to skip →" button at bottom
5. Click to skip or watch full animation

### Mobile (Chrome DevTools):
1. Press `F12` → Toggle device toolbar (`Ctrl+Shift+M`)
2. Select "iPhone 12" or "Galaxy S21"
3. Refresh page
4. **Triple-tap** AWS logo
5. Animation should be smooth (no choppiness!)
6. Skip button appears after 2 seconds

---

## ✅ What to Look For

### ✔️ **Good Signs:**
- Logo responds to 3 rapid taps
- Animation runs smoothly 60fps
- Text is readable (not tiny or huge)
- Skip button fades in at bottom
- No horizontal scrolling
- Stars are visible but not overwhelming
- Normal cursor on mobile (can tap normally)

### ❌ **Bad Signs:**
- Logo doesn't respond to taps
- Animation stutters or lags
- Text overlaps or is cut off
- Skip button never appears
- Scrollbars appear
- Too many/few stars
- Can't tap buttons normally

---

## 📱 Real Device Testing

**iPhone/Android:**
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On phone, open browser: `http://YOUR_IP:3000`
3. Triple-tap logo
4. **Feel the vibration!** (Initial pulse + shake during red stage)
5. Tap skip button

---

## 🐛 Troubleshooting

### "Triple-tap doesn't work"
- Make sure you tap **within 500ms** (half a second)
- Try tapping faster
- Check browser console for errors (F12)

### "Skip button doesn't appear"
- Wait full 2 seconds
- Make sure animation is running (not stuck)
- Check you're not in "shattered" stage (final 3.5s)

### "Animation is still choppy on mobile"
- Clear browser cache
- Restart dev server: `Ctrl+C` then `npm run dev`
- Try incognito mode

### "Vibration doesn't work"
- Use a **real device** (not DevTools)
- Check device settings (vibration enabled?)
- Some browsers block vibration (try Chrome)

---

## 🎮 All Trigger Methods

| Method | Desktop | Mobile | Notes |
|--------|---------|--------|-------|
| Type "aws" | ✅ | ✅ | Keyboard anywhere |
| Triple-click logo | ✅ | ❌ | Desktop only |
| Triple-tap logo | ✅ | ✅ | **Best for mobile** |
| Type in input box | ✅ | ✅ | Invitation generator |

---

## 📊 Expected Performance

### Desktop (1920×1080):
- **Stars:** 200
- **FPS:** 60
- **Sidebar:** Visible
- **Text size:** Large
- **Cursor:** Custom

### Mobile (375×667):
- **Stars:** 50
- **FPS:** 60
- **Sidebar:** Hidden
- **Text size:** Medium
- **Cursor:** Normal

---

## 🎬 Full Animation Timeline

| Time | Stage | What Happens | Can Skip? |
|------|-------|--------------|-----------|
| 0.0s | Centering | Golden dot appears | ❌ |
| 0.2s | Rotating | Dot spins 360° | ❌ |
| 0.7s | Expanding | Explodes into terminal | ❌ |
| 1.1s | Provisioning | Text types out | ✅ (after 2s) |
| 4.0s | Overload | Turns red, shakes | ✅ |
| 5.5s | Shattered | Window splits | ❌ |
| 6.0s | Smile | AWS logo draws | ❌ |
| 9.0s | Redirect | → /recruitment | - |

**Skip availability:** 2.0s - 5.5s (3.5 second window)

---

## 🔥 Power User Shortcuts

```bash
# Start dev server
npm run dev

# Clear caches if something breaks
rm -rf .next
npm run dev

# Test on phone (find IP first)
ipconfig  # Windows
ifconfig  # Mac/Linux
```

**Easter egg in action:**
1. Triple-tap logo (boom!)
2. Feel vibration
3. Watch 2 seconds
4. Tap skip → recruitment page

Done! 🎉

---

## 💬 Quick Feedback Questions

After testing, can you answer:
- ✅ Did triple-tap work first try?
- ✅ Was animation smooth on mobile?
- ✅ Did skip button appear?
- ✅ Did vibration work (real device)?
- ✅ Is text readable on all screen sizes?

If all yes → **Perfect!** 🚀
If any no → Check troubleshooting above
