import Card from '../Components/Card';

const Features = () => {
  return (
    <section className="relative z-20 bg-green-200 py-12 px-8">
      <h2 className="text-2xl font-semibold text-center mb-12">Penjelasan fitur aplikasi</h2>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} title={`Card Fitur ${i}`} />
        ))}
      </div>
    </section>
  );
};

export default Features;