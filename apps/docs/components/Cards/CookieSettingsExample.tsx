import { Button, Switch, Text } from "@rafty/ui";

const SETTINGS = [
  {
    heading: "Strictly Necessary",
    description:
      "These cookies are essential in order to use the website and use its features.",
  },
  {
    heading: "Functional Cookies",
    description:
      "These cookies allow the website to provide personalized functionality.",
  },
  {
    heading: "Performance Cookies",
    description:
      "These cookies help to improve the performance of the website.",
  },
];

export function CookieSettingsExample() {
  return (
    <div className="space-y-4">
      <div>
        <Text className="text-xl font-semibold leading-snug">
          Cookie Settings
        </Text>
        <Text className="text-sm opacity-60">
          Manage your cookie settings here.
        </Text>
      </div>
      {SETTINGS.map(({ heading, description }, index) => (
        <div key={heading} className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium">{heading}</Text>
            <Text className="max-w-[250px] text-xs opacity-50">
              {description}
            </Text>
          </div>
          <Switch defaultChecked={index < 2} aria-label={heading} />
        </div>
      ))}
      <Button variant="outline" colorScheme="primary" className="w-full">
        Save preference
      </Button>
    </div>
  );
}
