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
- **AI Coding Assistant**: Get intelligent help with coding problems, explanations, and code reviews
- **Knowledge Quiz**: Test your understanding with interactive quizzes
- **Certificate Generation**: Earn certificates upon successful quiz completion
- **Certificate Verification**: Verify certificate authenticity using QR codes

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Local Storage for progress tracking
- Lucide React for icons
- Google Generative AI for AI assistant
- QRCode React for certificate verification

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
│   │   │   ├── quiz/        # Knowledge quiz page
│   │   │   ├── certificate/ # Certificate generation page
│   │   │   ├── verify/[id]/ # Certificate verification page
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
- Google Gemini API Key (for AI assistant)

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
   
   # Add your Google Gemini API key to .env.local
   echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here" >> .env.local
   
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

### Certificate API
- `GET /api/certificate/verify/:id` - Verify certificate authenticity

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

### Knowledge Quiz
1. Navigate to `/quiz`
2. Take the DSA Fundamentals Quiz
3. Answer 5 questions on core concepts
4. Complete with a score of 70% or higher to earn a certificate

### Certificate Generation
1. Successfully complete a quiz with 70% or higher
2. Click "Generate Certificate" on the results page
3. View your personalized certificate
4. Print or save the certificate for your records

### Certificate Verification
1. Scan the QR code on any certificate
2. Or visit `/verify/[certificate-id]` directly
3. View certificate details and verification status
4. Confirm authenticity with the verification timestamp

### AI Coding Assistant
1. Click the floating AI assistant button in the bottom right corner
2. Use the chat tab to ask coding questions
3. Use the code analysis tab to get feedback on your code
4. Access learning resources through the resources tab

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
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key_here
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
- **Knowledge Quiz**: Interactive quizzes to test understanding
- **Certificate Generation**: Official-looking certificates for quiz completion
- **Certificate Verification**: QR code-based verification system
- **AI Coding Assistant**: Intelligent coding help powered by Google Gemini

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

3. **AI Assistant Not Working**
   - Verify you have added your Google Gemini API key to .env.local
   - Check that the API key is valid and has proper permissions
   - Make sure you're using a supported model (gemini-pro)
   - Check browser console for detailed error messages

4. **Quiz/Certificate Issues**
   - Ensure JavaScript is enabled in your browser
   - Check browser console for any errors
   - Try refreshing the page if the quiz doesn't load properly

5. **Certificate Verification Problems**
   - Ensure the QR code is scanned properly
   - Check that the certificate ID is valid
   - Try manual verification by visiting `/verify/[certificate-id]`

6. **Build Errors**
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
- More quiz topics and certificate types
- Enhanced certificate verification with blockchain technology