import MakeoutPlace from "./MakeoutPlace";

function App() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10 bg-gray-100 min-h-screen">
      <MakeoutPlace 
        name="Secret Garden" 
        description="A hidden spot surrounded by lush greenery, perfect for privacy."
        rating={4.8} 
        location="Behind the Library"
        image="https://source.unsplash.com/400x300/?garden,romantic"
      />
      <MakeoutPlace 
        name="Rooftop Lounge" 
        description="Offers a stunning sunset view, ideal for intimate moments."
        rating={4.6} 
        location="Main Building Rooftop"
        image="https://source.unsplash.com/400x300/?rooftop,sunset"
      />
    </div>
  );
}

export default App;
