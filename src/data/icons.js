import {
  AcademicCapIcon, BeakerIcon, BoltIcon, BriefcaseIcon, BuildingOfficeIcon,
  ChartBarIcon, ChatBubbleLeftRightIcon, CloudIcon, CodeBracketIcon,
  CommandLineIcon, CpuChipIcon, CubeIcon, DevicePhoneMobileIcon,
  DocumentTextIcon, FilmIcon, GlobeAltIcon, HeartIcon, LightBulbIcon,
  PaintBrushIcon, PresentationChartLineIcon, RocketLaunchIcon, ServerIcon,
  ServerStackIcon, ShieldCheckIcon, ShoppingCartIcon, SparklesIcon,
  UserGroupIcon, WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

/** Icons the admin can pick by name for projects, experience and skill cards. */
export const ICONS = {
  AcademicCapIcon, BeakerIcon, BoltIcon, BriefcaseIcon, BuildingOfficeIcon,
  ChartBarIcon, ChatBubbleLeftRightIcon, CloudIcon, CodeBracketIcon,
  CommandLineIcon, CpuChipIcon, CubeIcon, DevicePhoneMobileIcon,
  DocumentTextIcon, FilmIcon, GlobeAltIcon, HeartIcon, LightBulbIcon,
  PaintBrushIcon, PresentationChartLineIcon, RocketLaunchIcon, ServerIcon,
  ServerStackIcon, ShieldCheckIcon, ShoppingCartIcon, SparklesIcon,
  UserGroupIcon, WrenchScrewdriverIcon,
};

export const ICON_NAMES = Object.keys(ICONS);

export const getIcon = (name, fallback = CodeBracketIcon) => ICONS[name] || fallback;
