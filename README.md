# 2048 Game

A modern, responsive implementation of the popular 2048 puzzle game built with HTML5, CSS3, and JavaScript. The game features a beautiful gradient design, smooth animations, and supports multiple board sizes.

![2048 Game Screenshot](https://via.placeholder.com/600x400/667eea/ffffff?text=2048+Game)

## 🎮 Game Overview

2048 is a sliding puzzle game where you combine numbered tiles to reach the 2048 tile. The game is won when you create a tile with the number 2048, but you can continue playing to achieve higher scores.

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Board Sizes**: Play on 3x3, 4x4, 5x5, or 6x6 grids
- **Dual Controls**: Use arrow keys or WASD for movement
- **Score Tracking**: Track your current score and best score (persisted in localStorage)
- **Smooth Animations**: Beautiful tile animations and transitions
- **Modern UI**: Gradient backgrounds, glassmorphism effects, and clean typography
- **Game States**: Win detection, game over detection, and restart functionality
- **Functional Programming**: Clean, modular code following functional programming principles

## 🚀 Installation & Setup

### Option 1: Direct Download
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start playing immediately!

### Option 2: Local Server (Recommended)
For the best experience, serve the files through a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Deploy to Web
Upload the files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting provider

## 🎯 How to Play

### Basic Rules
1. **Movement**: Use arrow keys (↑↓←→) or WASD keys to move tiles
2. **Merging**: When two tiles with the same number touch, they merge into one tile with their sum
3. **New Tiles**: After each move, a new tile (2 or 4) appears in a random empty position
4. **Objective**: Reach the 2048 tile to win the game
5. **Game Over**: The game ends when the board is full and no moves are possible

### Controls
- **Arrow Keys**: ↑ (Up), ↓ (Down), ← (Left), → (Right)
- **WASD Keys**: W (Up), S (Down), A (Left), D (Right)
- **New Game Button**: Start a fresh game
- **Board Size Selector**: Change the grid size (3x3 to 6x6)

### Scoring
- Points are awarded when tiles merge
- The merged tile's value is added to your score
- Your best score is automatically saved and displayed

## 🏗️ Technical Implementation

### Architecture
The game follows functional programming principles with a clean, modular architecture:

- **Game2048 Class**: Main game controller
- **Board Management**: Dynamic grid creation and rendering
- **Movement Logic**: Slide and merge algorithms for all directions
- **State Management**: Game state, scoring, and persistence
- **UI Rendering**: Dynamic DOM manipulation with CSS animations

### Key Components

#### Core Game Logic
```javascript
// Board initialization
createEmptyBoard() {
    return Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
}

// Tile movement and merging
slideAndMerge(array) {
    const filtered = array.filter(val => val !== 0);
    const merged = [];
    // Merge logic...
    return merged;
}
```

#### Responsive Design
- CSS Grid for flexible board layouts
- Media queries for mobile optimization
- Fluid typography and spacing
- Touch-friendly controls

#### State Persistence
- LocalStorage for best score tracking
- Session-based game state management

### File Structure
```
2048-game/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── game.js            # Game logic and functionality
└── README.md          # This documentation
```

## 🎨 Design Features

### Visual Design
- **Gradient Background**: Beautiful purple gradient backdrop
- **Glassmorphism**: Semi-transparent elements with backdrop blur
- **Tile Colors**: Distinct colors for different tile values
- **Typography**: Clean Inter font family
- **Animations**: Smooth tile appearance and movement transitions

### Responsive Breakpoints
- **Desktop**: Full-size tiles and controls
- **Tablet**: Optimized spacing and sizing
- **Mobile**: Compact layout with touch-friendly elements

## 🔧 Customization

### Board Size
The game supports configurable board sizes from 3x3 to 6x6:
- 3x3: Quick games, easier to fill
- 4x4: Classic 2048 experience
- 5x5: More challenging, longer games
- 6x6: Expert level difficulty

### Styling
Modify `styles.css` to customize:
- Color schemes
- Animations
- Typography
- Layout spacing

### Game Rules
Adjust game parameters in `game.js`:
- Tile spawn probabilities
- Win conditions
- Scoring multipliers

## 🐛 Troubleshooting

### Common Issues

**Game not loading:**
- Ensure all files are in the same directory
- Check browser console for JavaScript errors
- Try serving through a local web server

**Controls not working:**
- Make sure the game board has focus
- Check if another element is capturing keyboard events
- Try refreshing the page

**Scores not saving:**
- Verify localStorage is enabled in your browser
- Check browser privacy settings

**Mobile responsiveness:**
- Ensure viewport meta tag is present
- Test on actual devices, not just browser dev tools

## 🚀 Performance

### Optimizations
- Efficient DOM manipulation
- Minimal re-rendering
- Optimized CSS animations
- Lazy loading of resources

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit:
- Bug reports
- Feature requests
- Code improvements
- Documentation updates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Inspired by the original 2048 game by Gabriele Cirulli
- Built with modern web technologies
- Designed for accessibility and user experience

---

**Enjoy playing 2048!** 🎮

Try to beat your high score and see how far you can go beyond 2048!
