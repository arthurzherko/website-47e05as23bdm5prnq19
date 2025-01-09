import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CoffeeRecommendationProps {
  coffee: {
    name: string;
    description: string;
    roastLevel: string;
    intensity: string;
    origin: string;
  };
}

const CoffeeRecommendation = ({ coffee }: CoffeeRecommendationProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{coffee.name}</CardTitle>
        <CardDescription>{coffee.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{coffee.roastLevel} Roast</Badge>
          <Badge variant="secondary">{coffee.intensity} Intensity</Badge>
          <Badge variant="secondary">{coffee.origin}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoffeeRecommendation;