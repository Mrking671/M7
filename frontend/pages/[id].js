// Add this state
const [loading, setLoading] = useState(true);

// Update useEffect
useEffect(() => {
  if (id) {
    setLoading(true);
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }
}, [id]);

// Update return statement
if (loading) return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
  </div>
);
