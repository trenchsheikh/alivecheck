# AliveCheck PWA

A humanitarian offline-first Progressive Web App for people in crisis areas to safely signal they are alive.

## Features

### Core Functionality
- **One-tap safety check-in** with large, calming "I'm Safe" button
- **Offline-first design** - works without internet connection
- **Location tracking** (with permission) for check-ins
- **Check-in history** with timestamps and sync status
- **Trusted contacts management** (Telegram, Email, SMS)

### Security & Privacy
- **Stealth mode** - disguises app as a working calculator
- **Local-only data** - no backend servers, all data stays on device
- **Secret reveal mechanism** - triple-tap calculator logo to reveal real app
- **Complete data erasure** option in emergency situations

### PWA Features
- **Installable** - can be installed on home screen like native app
- **Offline functionality** - service worker caches all resources
- **IndexedDB storage** - persistent local database for check-ins and contacts
- **Responsive design** - optimized for mobile devices

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Technical Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Database:** IndexedDB (via `idb` library)
- **PWA:** vite-plugin-pwa with Workbox
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CheckInButton   # Main safety check-in button
│   ├── CheckInCard     # History item display
│   ├── ContactForm     # Add/edit trusted contacts
│   └── Calculator      # Stealth mode calculator
├── pages/              # Route components
│   ├── HomePage        # Main check-in interface
│   ├── HistoryPage     # Check-in history list
│   ├── SettingsPage    # App configuration
│   └── StealthCalculatorPage # Calculator disguise
├── hooks/              # Custom React hooks
│   ├── useCheckIns     # Check-in data management
│   ├── useContacts     # Trusted contacts management
│   └── useStealthMode  # Stealth mode toggle
├── utils/              # Utility functions
│   └── database.ts     # IndexedDB operations
└── App.tsx             # Main app component
```

## Usage Guide

### Normal Mode
1. **Check-in:** Tap the large "I'm Safe" button on the home screen
2. **View History:** Navigate to History tab to see past check-ins
3. **Add Contacts:** Go to Settings > Trusted Contacts to add emergency contacts
4. **Toggle Dark Mode:** Use the dark mode switch in Settings

### Stealth Mode
1. **Enable:** Go to Settings and toggle "Stealth Mode"
2. **Calculator Interface:** App now appears as a working calculator
3. **Reveal App:** Triple-tap the calculator logo to return to AliveCheck
4. **Disable:** Turn off stealth mode in Settings

### Emergency Features
- **Quick Access:** App works entirely offline after first load
- **Location Privacy:** Location is only stored locally, never transmitted
- **Data Security:** All information remains on the device
- **Emergency Erase:** Complete data deletion available in Settings > Danger Zone

## Design Philosophy

### Emotional Safety
- **Calming Colors:** Teal primary color chosen for its calming, safety-associated properties
- **Minimal Interface:** Clean, uncluttered design reduces cognitive load during stress
- **Large Touch Targets:** Easy to use with one hand, even when shaking
- **Reassuring Feedback:** Visual confirmations and gentle animations

### Crisis-Optimized UX
- **Offline-First:** No dependency on network connectivity
- **Battery Efficient:** Minimal background processing
- **Quick Access:** One-tap main function
- **Stealth Capability:** Can be disguised for safety in sensitive situations

## Security Considerations

- **No External Dependencies:** All data processing happens locally
- **No Analytics:** No tracking or data collection
- **Disguised Mode:** Stealth calculator provides operational security
- **Emergency Protocols:** Quick data erasure for compromised devices

## Browser Compatibility

- **Modern Browsers:** Chrome 88+, Firefox 85+, Safari 14+
- **Mobile:** iOS Safari 14.5+, Chrome Mobile 88+
- **PWA Support:** All browsers with service worker support
- **IndexedDB:** Required for data persistence

## Contributing

This is a humanitarian tool. Contributions that improve accessibility, security, or user experience in crisis situations are especially welcome.

## License

MIT License - This software is provided for humanitarian purposes.