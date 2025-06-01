import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, BookOpen, UserCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

// Mock student data
const mockStudents = [
  {
    id: "1",
    name: "Michael Johnson",
    image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
    location: "Nairobi, Kenya",
    school: "Greenwood Academy",
    grade: "Grade 10",
    fundingNeeded: 1200,
    fundingReceived: 450,
    verified: true,
    story: "Michael dreams of becoming a doctor to help his community. He has consistently been at the top of his class despite facing many challenges at home. He needs support to continue his education through high school.",
  },
  {
    id: "2",
    name: "Amina Ibrahim",
    image: "https://images.pexels.com/photos/3662628/pexels-photo-3662628.jpeg",
    location: "Accra, Ghana",
    school: "Sunrise College",
    grade: "Grade 8",
    fundingNeeded: 950,
    fundingReceived: 320,
    verified: true,
    story: "Amina excels in mathematics and wants to be an engineer. She is passionate about using technology to solve local challenges in her community. Your support will help her continue her education.",
  },
  {
    id: "3",
    name: "Raj Patel",
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    location: "Mumbai, India",
    school: "St. Xavier's School",
    grade: "Grade 11",
    fundingNeeded: 1500,
    fundingReceived: 900,
    verified: true,
    story: "Raj is passionate about computer science and developing apps. He has already created a simple application to help his community access clean water sources. He needs support to finish his schooling.",
  },
  {
    id: "4",
    name: "Sofia Rodriguez",
    image: "https://images.pexels.com/photos/1442005/pexels-photo-1442005.jpeg",
    location: "Medellin, Colombia",
    school: "Esperanza Institute",
    grade: "Grade 9",
    fundingNeeded: 1100,
    fundingReceived: 250,
    verified: true,
    story: "Sofia loves literature and writing. She dreams of becoming a journalist to report on issues affecting her community. Your support will help her access the resources she needs to pursue her education.",
  },
  {
    id: "5",
    name: "David Nguyen",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    location: "Hanoi, Vietnam",
    school: "Hanoi International School",
    grade: "Grade 12",
    fundingNeeded: 1800,
    fundingReceived: 1200,
    verified: true,
    story: "David is in his final year of high school and has been accepted to university to study environmental science. He needs support to cover his university entrance fees and first-year expenses.",
  },
  {
    id: "6",
    name: "Leila Abadi",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    location: "Amman, Jordan",
    school: "Amman Academy",
    grade: "Grade 10",
    fundingNeeded: 1350,
    fundingReceived: 600,
    verified: true,
    story: "Leila excels in science and mathematics. She dreams of studying medicine to provide healthcare in underserved communities. Your support will help her continue her education.",
  },
];

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    grade: '',
    location: '',
    fundingRange: '',
  });
  
  const [students, setStudents] = useState(mockStudents);
  
  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Students Seeking Sponsorship</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse through profiles of students who need your support to continue their education.
            All students are verified, and your contribution is tracked with complete transparency.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, location, or school..."
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:w-auto flex space-x-2">
              <select 
                className="form-input bg-white"
                value={filters.grade}
                onChange={(e) => setFilters({...filters, grade: e.target.value})}
              >
                <option value="">All Grades</option>
                <option value="elementary">Elementary</option>
                <option value="middle">Middle School</option>
                <option value="high">High School</option>
                <option value="university">University</option>
              </select>
              <select 
                className="form-input bg-white"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="latinamerica">Latin America</option>
                <option value="middleeast">Middle East</option>
              </select>
              <Button 
                variant="outline" 
                className="flex items-center"
                leftIcon={<Filter className="h-4 w-4" />}
              >
                <span className="hidden sm:inline">More Filters</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No students match your search</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search term</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ grade: '', location: '', fundingRange: '' });
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    {student.verified && (
                      <Badge variant="success" className="flex items-center space-x-1">
                        <UserCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{student.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{student.school} • {student.grade}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{student.story}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Funding Progress</span>
                      <span className="text-primary-600">{`$${student.fundingReceived} / $${student.fundingNeeded}`}</span>
                    </div>
                    <ProgressBar 
                      value={student.fundingReceived} 
                      max={student.fundingNeeded} 
                      variant="primary"
                    />
                  </div>
                  
                  <Link to={`/students/${student.id}`}>
                    <Button variant="primary" fullWidth>
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              {[1, 2, 3].map((page) => (
                <a
                  key={page}
                  href="#"
                  className={`px-4 py-2 border border-gray-300 ${
                    page === 1
                      ? 'bg-primary-50 text-primary-600 border-primary-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {page}
                </a>
              ))}
              <a
                href="#"
                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;