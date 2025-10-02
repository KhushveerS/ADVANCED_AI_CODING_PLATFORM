# DSA & CP Platform

A comprehensive platform for practicing Data Structures & Algorithms and Competitive Programming problems from LeetCode and Codeforces.

## Features

- **DSA Problems**: Practice LeetCode problems organized by topic and difficulty
- **CP Problems**: Solve Codeforces problems with different rating ranges
- **Contest Tracking**: Stay updated with upcoming programming contests
- **System Design**: Learn system design concepts and prepare for interviews
- **Operating System**: Study OS concepts with dedicated learning paths
- **Progress Tracking**: Track solved and bookmarked problems with local storage
- **Personal Notes**: Save notes for each problem
- **Dark/Light Theme**: Comfortable coding experience
- **Real-time API**: Fresh problems fetched from LeetCode and Codeforces
- **Responsive Design**: Works on all devices
- **Circular Progress Visualization**: Visualize your DSA and CP progress with circular indicators
- **Separate DSA/CP Tracking**: Track DSA and CP problems separately with detailed statistics

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Local Storage for progress tracking

### Backend
- Node.js
- Express.js
- LeetCode GraphQL API
- Codeforces REST API
- Fallback data for offline use

## Project Structure

```
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── dsa/         # DSA problems page
│   │   │   ├── cp/          # CP problems page
│   │   │   ├── contest/     # Contest tracking page
│   │   │   ├── system-design/ # System design learning page
│   │   │   ├── operating-system/ # OS learning page
│   │   │   └── notes/       # Notes page
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and API calls
│   │   └── types/          # TypeScript types
│   └── package.json
├── backend/                 # Express backend
│   ├── src/
│   │   ├── data/           # Fallback data
│   │   ├── services/       # External API services
│   │   └── server.ts       # Main server file
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KhushveerS/ADVANCED_AI_CODING_PLATFORM.git
   cd ADAVEC_AI_CODING_PLATFORM
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file (optional)
   cp env.example .env
   
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env.local file
   cp env.local.example .env.local
   
   # Start frontend development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### DSA API
- `GET /api/dsa/problems?topic=array&difficulty=medium` - Get DSA problems
- `GET /api/dsa/topics` - Get available topics
- `GET /api/dsa/difficulties` - Get available difficulties

### CP API
- `GET /api/cp/problems?ratingMin=1200&ratingMax=1500&topic=dp` - Get CP problems
- `GET /api/cp/topics` - Get available topics
- `GET /api/cp/rating-ranges` - Get rating ranges

### Contest API
- `GET /api/contests/codeforces` - Get upcoming Codeforces contests

### Health Check
- `GET /api/health` - Server health status

## Usage

### DSA Practice
1. Navigate to `/dsa`
2. Select a topic (Arrays, Strings, DP, etc.)
3. Choose difficulty (Easy, Medium, Hard)
4. Browse and solve problems
5. Bookmark interesting problems
6. Track your progress with circular indicators

### Competitive Programming
1. Navigate to `/cp`
2. Set rating range (e.g., 1200-1500)
3. Optionally filter by topic
4. Solve problems from Codeforces
5. Track your progress with circular indicators

### Contest Tracking
1. Navigate to `/contest`
2. View upcoming and ongoing contests from Codeforces
3. Get real-time contest information

### System Design Learning
1. Navigate to `/system-design`
2. Explore system design topics and concepts
3. Track your learning progress

### Operating System Learning
1. Navigate to `/operating-system`
2. Study OS concepts with detailed resources
3. Track your learning progress

### Notes & Progress
1. Navigate to `/notes`
2. View your progress statistics with circular indicators for DSA and CP
3. Add notes for specific problems
4. Edit or delete existing notes

## Environment Variables

### Backend (.env) - Optional
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development

### Backend Development
```bash
cd backend
npm run dev    # Start with nodemon
npm run build  # Build TypeScript
npm start      # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

## Testing

### Backend API Testing
Use Postman or curl to test the API endpoints:

```bash
# Test DSA problems
curl "http://localhost:5000/api/dsa/problems?topic=array&difficulty=medium"

# Test CP problems
curl "http://localhost:5000/api/cp/problems?ratingMin=1200&ratingMax=1500"

# Test contests
curl "http://localhost:5000/api/contests/codeforces"

# Test health check
curl "http://localhost:5000/api/health"
```

## Features in Detail

### Real-time Problem Fetching
- Problems are fetched fresh from LeetCode and Codeforces APIs
- Fallback data available if APIs are unavailable
- No database required - works out of the box

### Progress Tracking
- Local storage for solved/bookmarked problems
- Personal notes for each problem
- Progress statistics dashboard
- Circular progress visualization for DSA and CP separately
- Detailed progress tracking in each section

### Theme Support
- Dark and light theme toggle
- Persistent theme preference
- System theme detection

### New Sections
- **Contest Tracking**: Real-time contest information from Codeforces
- **System Design**: Comprehensive system design learning resources
- **Operating System**: Detailed OS concept learning with study materials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if backend is running on port 5000
   - Verify internet connection for API calls

2. **Frontend Connection Error**
   - Verify backend is running on port 5000
   - Check NEXT_PUBLIC_API_URL in frontend .env.local

3. **Build Errors**
   - Run `npm install` in both frontend and backend
   - Check Node.js version compatibility

## Future Enhancements

- User authentication and profiles
- Problem recommendations
- Contest integration with more platforms
- Social features (leaderboards, discussions)
- Mobile app
- Advanced analytics and insights
- AI-powered problem suggestions
- Interview preparation modules