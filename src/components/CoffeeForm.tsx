import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface CoffeePreferences {
  roastLevel: number;
  intensity: number;
  milkBased: boolean;
  origin: string;
}

interface CoffeeFormProps {
  onSubmit: (preferences: CoffeePreferences) => void;
}

const CoffeeForm = ({ onSubmit }: CoffeeFormProps) => {
  const [preferences, setPreferences] = useState<CoffeePreferences>({
    roastLevel: 50,
    intensity: 50,
    milkBased: false,
    origin: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="roastLevel">Roast Level</Label>
        <Slider
          id="roastLevel"
          min={0}
          max={100}
          step={1}
          value={[preferences.roastLevel]}
          onValueChange={(value) => setPreferences({ ...preferences, roastLevel: value[0] })}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Light</span>
          <span>Medium</span>
          <span>Dark</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="intensity">Intensity</Label>
        <Slider
          id="intensity"
          min={0}
          max={100}
          step={1}
          value={[preferences.intensity]}
          onValueChange={(value) => setPreferences({ ...preferences, intensity: value[0] })}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Mild</span>
          <span>Balanced</span>
          <span>Strong</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="milkBased"
          checked={preferences.milkBased}
          onCheckedChange={(checked) => setPreferences({ ...preferences, milkBased: checked })}
        />
        <Label htmlFor="milkBased">Milk-based</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">Preferred Origin (optional)</Label>
        <Input
          id="origin"
          value={preferences.origin}
          onChange={(e) => setPreferences({ ...preferences, origin: e.target.value })}
          placeholder="e.g. Ethiopia, Colombia"
        />
      </div>

      <Button type="submit" className="w-full">Get Recommendations</Button>
    </form>
  );
};

export default CoffeeForm;