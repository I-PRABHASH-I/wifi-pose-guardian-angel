# Libraries and Dependencies

This document provides a comprehensive overview of all libraries and dependencies used in the WiFi Pose Guardian Angel project.

## Project Architecture

This is a full-stack application consisting of:
- **Frontend**: React-based web application built with Vite and TypeScript
- **Backend**: Python Flask server with machine learning capabilities
- **Machine Learning**: PyTorch-based LSTM model for pose detection using WiFi CSI data

---

## Frontend Dependencies (JavaScript/TypeScript)

### Core Framework & Build Tools
- **React** (`^18.3.1`) - JavaScript library for building user interfaces
- **React DOM** (`^18.3.1`) - React package for DOM rendering
- **Vite** (`^5.4.1`) - Next-generation frontend build tool
- **TypeScript** (`^5.5.3`) - Typed superset of JavaScript

### UI Component Library (Radix UI)
- **@radix-ui/react-accordion** (`^1.2.0`) - Accessible accordion component
- **@radix-ui/react-alert-dialog** (`^1.1.1`) - Alert dialog component
- **@radix-ui/react-aspect-ratio** (`^1.1.0`) - Aspect ratio container
- **@radix-ui/react-avatar** (`^1.1.0`) - Avatar display component
- **@radix-ui/react-checkbox** (`^1.1.1`) - Checkbox input component
- **@radix-ui/react-collapsible** (`^1.1.0`) - Collapsible content component
- **@radix-ui/react-context-menu** (`^2.2.1`) - Context menu component
- **@radix-ui/react-dialog** (`^1.1.2`) - Modal dialog component
- **@radix-ui/react-dropdown-menu** (`^2.1.1`) - Dropdown menu component
- **@radix-ui/react-hover-card** (`^1.1.1`) - Hover card component
- **@radix-ui/react-label** (`^2.1.0`) - Form label component
- **@radix-ui/react-menubar** (`^1.1.1`) - Menu bar component
- **@radix-ui/react-navigation-menu** (`^1.2.0`) - Navigation menu component
- **@radix-ui/react-popover** (`^1.1.1`) - Popover component
- **@radix-ui/react-progress** (`^1.1.0`) - Progress indicator component
- **@radix-ui/react-radio-group** (`^1.2.0`) - Radio button group component
- **@radix-ui/react-scroll-area** (`^1.1.0`) - Custom scrollable area
- **@radix-ui/react-select** (`^2.1.1`) - Select dropdown component
- **@radix-ui/react-separator** (`^1.1.0`) - Visual separator component
- **@radix-ui/react-slider** (`^1.2.0`) - Slider input component
- **@radix-ui/react-slot** (`^1.1.0`) - Slot component for composition
- **@radix-ui/react-switch** (`^1.1.0`) - Toggle switch component
- **@radix-ui/react-tabs** (`^1.1.0`) - Tab navigation component
- **@radix-ui/react-toast** (`^1.2.1`) - Toast notification component
- **@radix-ui/react-toggle** (`^1.1.0`) - Toggle button component
- **@radix-ui/react-toggle-group** (`^1.1.0`) - Toggle button group
- **@radix-ui/react-tooltip** (`^1.1.4`) - Tooltip component

### Styling & Design
- **TailwindCSS** (`^3.4.11`) - Utility-first CSS framework
- **@tailwindcss/typography** (`^0.5.15`) - Typography plugin for Tailwind
- **tailwindcss-animate** (`^1.0.7`) - Animation utilities for Tailwind
- **PostCSS** (`^8.4.47`) - CSS post-processor
- **Autoprefixer** (`^10.4.20`) - CSS vendor prefixer
- **tailwind-merge** (`^2.5.2`) - Utility for merging Tailwind classes
- **class-variance-authority** (`^0.7.1`) - Class variant utility
- **clsx** (`^2.1.1`) - Conditional className utility
- **next-themes** (`^0.3.0`) - Theme management

### Form Handling & Validation
- **react-hook-form** (`^7.53.0`) - Performant forms with easy validation
- **@hookform/resolvers** (`^3.9.0`) - Validation resolvers for react-hook-form
- **zod** (`^3.23.8`) - TypeScript-first schema validation

### Data Fetching & State Management
- **@tanstack/react-query** (`^5.56.2`) - Powerful data synchronization for React

### Routing
- **react-router-dom** (`^6.26.2`) - Declarative routing for React

### UI Utilities & Components
- **lucide-react** (`^0.462.0`) - Icon library
- **cmdk** (`^1.0.0`) - Command palette component
- **embla-carousel-react** (`^8.3.0`) - Carousel component
- **react-day-picker** (`^8.10.1`) - Date picker component
- **react-resizable-panels** (`^2.1.3`) - Resizable panel components
- **recharts** (`^2.12.7`) - Charting library for React
- **sonner** (`^1.5.0`) - Toast notification library
- **vaul** (`^0.9.3`) - Drawer component
- **input-otp** (`^1.2.4`) - OTP input component
- **date-fns** (`^3.6.0`) - Date utility library

### Development Tools
- **ESLint** (`^9.9.0`) - JavaScript/TypeScript linter
- **@eslint/js** (`^9.9.0`) - ESLint JavaScript configs
- **eslint-plugin-react-hooks** (`^5.1.0-rc.0`) - ESLint rules for React Hooks
- **eslint-plugin-react-refresh** (`^0.4.9`) - ESLint rules for React Refresh
- **typescript-eslint** (`^8.0.1`) - TypeScript ESLint integration
- **globals** (`^15.9.0`) - Global variables for ESLint
- **@vitejs/plugin-react-swc** (`^3.5.0`) - Vite React plugin with SWC
- **@types/node** (`^22.5.5`) - TypeScript definitions for Node.js
- **@types/react** (`^18.3.3`) - TypeScript definitions for React
- **@types/react-dom** (`^18.3.0`) - TypeScript definitions for React DOM
- **lovable-tagger** (`^1.1.7`) - Development utility

---

## Backend Dependencies (Python)

### Web Framework
- **Flask** (`>=2.0.0`) - Micro web framework for Python
- **flask-cors** (`>=3.0.10`) - Cross-Origin Resource Sharing (CORS) handling for Flask

### Machine Learning & Deep Learning
- **PyTorch** (`>=1.10.0`) - Deep learning framework
  - Used for LSTM model implementation
  - Handles neural network training and inference
- **scikit-learn** (`>=0.24.0`) - Machine learning library
  - Used for model evaluation metrics
  - Train/test data splitting
  - Confusion matrix and classification reports

### Data Processing & Manipulation
- **NumPy** (`>=1.21.0`) - Numerical computing library
  - Array operations and mathematical functions
  - Data preprocessing for CSI signals
- **Pandas** (`>=1.3.0`) - Data manipulation and analysis
  - CSV file processing
  - Dataset handling and management
- **SciPy** (`>=1.7.0`) - Scientific computing library
  - Signal processing functions (butter, filtfilt)
  - Used for CSI data filtering and preprocessing

### Data Visualization
- **Matplotlib** (`>=3.4.0`) - Plotting library
  - Model validation visualizations
  - Confusion matrix plots
- **Seaborn** (`>=0.11.0`) - Statistical data visualization
  - Enhanced confusion matrix visualizations
  - Built on top of Matplotlib

### Environment & Configuration
- **python-dotenv** (`>=0.19.0`) - Environment variable management
  - Load configuration from .env files

---

## Additional Python Libraries (Imported in Code)

### Standard Library Modules
- **os** - Operating system interface
- **sys** - System-specific parameters and functions
- **werkzeug.utils** - Utility functions (secure_filename for file uploads)

---

## Machine Learning Model Architecture

The project uses a custom LSTM (Long Short-Term Memory) neural network implemented in PyTorch:

### Model Components:
- **Input Layer**: Processes 30 subcarriers of CSI data
- **LSTM Layers**: 2-layer LSTM with 64 hidden units
- **Fully Connected Layers**: Dense layers for classification
- **Output**: 
  - Human presence detection (binary classification)
  - Pose classification (4 classes: Stand, Sit, Kneel, Sleep)

### Model Features:
- **Multi-task Learning**: Simultaneous presence detection and pose classification
- **Sequential Data Processing**: LSTM handles time-series CSI data
- **GPU Support**: CUDA acceleration when available

---

## Data Processing Pipeline

### CSI Data Handling:
- **Input Format**: CSV files with CSI subcarrier data
- **Preprocessing**: Signal filtering using Butterworth filters
- **Data Augmentation**: Synthetic CSI data generation
- **Dataset Management**: Custom PyTorch Dataset class for CSI data

### Signal Processing:
- **Filtering**: Low-pass and high-pass filtering of CSI signals
- **Noise Simulation**: Addition of realistic WiFi interference
- **Data Validation**: Model performance evaluation with confusion matrices

---

## Development & Build Tools

### Frontend Build Process:
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type checking and compilation
- **ESLint**: Code linting and style enforcement
- **PostCSS/TailwindCSS**: CSS processing and utility generation

### Backend Requirements:
- **Python 3.7+**: Required for all backend dependencies
- **PyTorch**: Requires compatible CUDA version for GPU acceleration
- **Flask Development Server**: Built-in development server for testing

This comprehensive library overview provides developers with all necessary information to understand, set up, and contribute to the WiFi Pose Guardian Angel project.