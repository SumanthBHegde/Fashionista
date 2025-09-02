# 🎨 Fashionista - 3D Fashion Customizer

My personal project for 3D fashion customization using React and Three.js.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🌟 What it does

- 3D t-shirt and hoodie models you can customize
- Upload logos and place them on front/back
- Change colors in real-time
- Interactive rotation and positioning controls

## �️ Built with

- React + Vite
- Three.js + React Three Fiber
- Tailwind CSS
- Valtio for state management

## 🐛 Known Issue - Help Wanted!

**Problem**: Logo controls don't work on hoodie model (only works on t-shirt)

If you want to help fix this:
- The issue is in `src/canvas/BaseModel3D.jsx` around lines 296 and 318
- Logo rendering is disabled for hoodie with `!isHoodie` condition
- Just need to remove that condition and test that logos position correctly

Would be grateful for any help fixing this! 🙏
