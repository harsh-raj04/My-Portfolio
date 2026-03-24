module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        sky: '#3B82F6',
        mint: '#22C55E',
        mist: '#F8FAFC'
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.14)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top, rgba(59,130,246,0.22), transparent 42%), radial-gradient(circle at bottom right, rgba(34,197,94,0.16), transparent 40%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(59,130,246,0.0)' },
          '50%': { boxShadow: '0 0 24px rgba(59,130,246,0.24)' }
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(10px,-8px,0)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

