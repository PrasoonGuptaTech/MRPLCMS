import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';
import PageHome from '../../assets/svg/PageHome.svg';
import PageAbout from '../../assets/svg/PageAbout.svg';
import PageProjects from '../../assets/svg/PageProjects.svg';
import PageExperience from '../../assets/svg/PageExperience.svg';
import PageEducation from '../../assets/svg/PageEducation.svg';
import PageCertificates from '../../assets/svg/PageCertificates.svg';
import PageSkills from '../../assets/svg/PageSkills.svg';
import PageInterests from '../../assets/svg/PageInterests.svg';
import PageContact from '../../assets/svg/PageContact.svg';
import PageResume from '../../assets/svg/PageResume.svg';
import PageNavigation from '../../assets/svg/PageNavigation.svg';
import ActionAddProject from '../../assets/svg/ActionAddProject.svg';
import ActionEditHome from '../../assets/svg/ActionEditHome.svg';
import ActionUploadResume from '../../assets/svg/ActionUploadResume.svg';
import ActivityPublish from '../../assets/svg/ActivityPublish.svg';
import ActivityEdit from '../../assets/svg/ActivityEdit.svg';
import ActivityCertificate from '../../assets/svg/ActivityCertificate.svg';
import ActivityImage from '../../assets/svg/ActivityImage.svg';
import ActivityDocument from '../../assets/svg/ActivityDocument.svg';

export type PortfolioPage = {
  key: string;
  label: string;
  meta: string;
  Icon: ComponentType<SvgProps>;
  badge?: boolean;
};

export const PORTFOLIO_PAGES: PortfolioPage[] = [
  { key: 'home', label: 'Home', meta: '8 sections', Icon: PageHome },
  { key: 'about', label: 'About', meta: 'Bio & details', Icon: PageAbout },
  {
    key: 'projects',
    label: 'Projects',
    meta: '4 of 6 live',
    Icon: PageProjects,
  },
  {
    key: 'experience',
    label: 'Experience',
    meta: '4 roles',
    Icon: PageExperience,
  },
  {
    key: 'education',
    label: 'Education',
    meta: '2 entries',
    Icon: PageEducation,
  },
  {
    key: 'certificates',
    label: 'Certificates',
    meta: '3 credentials',
    Icon: PageCertificates,
    badge: true,
  },
  { key: 'skills', label: 'Skills', meta: '11 skills', Icon: PageSkills },
  {
    key: 'achievements',
    label: 'Achievements',
    meta: '4 entries',
    Icon: PageCertificates,
  },
  {
    key: 'interests',
    label: 'Interests',
    meta: '5 listed',
    Icon: PageInterests,
  },
  {
    key: 'contact',
    label: 'Contact',
    meta: 'Form & socials',
    Icon: PageContact,
  },
  { key: 'resume', label: 'Resume', meta: 'Version 3', Icon: PageResume },
  {
    key: 'navigation',
    label: 'Navigation',
    meta: '7 in menu',
    Icon: PageNavigation,
  },
];

export type QuickAction = {
  key: string;
  label: string;
  Icon: ComponentType<SvgProps>;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { key: 'add-project', label: 'Add project', Icon: ActionAddProject },
  { key: 'add-experience', label: 'Add experience', Icon: PageExperience },
  { key: 'edit-home', label: 'Edit Home', Icon: ActionEditHome },
  { key: 'upload-resume', label: 'Upload resume', Icon: ActionUploadResume },
];

export type ProjectStatus = 'published' | 'draft';

export type Project = {
  id: string;
  name: string;
  owner: string;
  itemCount: number;
  editedLabel: string;
  status: ProjectStatus;
  tags: string[];
  initials: string;
  recent: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'nameless-portfolio',
    name: 'Nameless Portfolio',
    owner: 'Prasoon',
    itemCount: 34,
    editedLabel: 'edited 2 days ago',
    status: 'published',
    tags: ['portfolio', 'personal'],
    initials: 'NP',
    recent: true,
  },
  {
    id: 'meridian-case-studies',
    name: 'Meridian Case Studies',
    owner: 'Meridian Bank',
    itemCount: 12,
    editedLabel: 'edited 1 week ago',
    status: 'published',
    tags: ['fintech', 'case study'],
    initials: 'MC',
    recent: true,
  },
  {
    id: 'aperture-design-system-docs',
    name: 'Aperture Design System Docs',
    owner: 'Aperture Labs',
    itemCount: 21,
    editedLabel: 'edited 3 weeks ago',
    status: 'draft',
    tags: ['design system', 'docs'],
    initials: 'AD',
    recent: true,
  },
  {
    id: 'kettle-and-co-storefront',
    name: 'Kettle & Co. Storefront',
    owner: 'Kettle & Co.',
    itemCount: 8,
    editedLabel: 'edited 2 months ago',
    status: 'published',
    tags: ['commerce', 'editorial'],
    initials: 'KC',
    recent: false,
  },
  {
    id: 'lumen-health-companion',
    name: 'Lumen Health Companion — concept work in progress',
    owner: 'Lumen Health',
    itemCount: 5,
    editedLabel: 'edited yesterday',
    status: 'draft',
    tags: ['health', 'concept'],
    initials: 'LH',
    recent: false,
  },
  {
    id: 'northwind-studio-archive',
    name: 'Northwind Studio Archive',
    owner: 'Northwind Studio',
    itemCount: 17,
    editedLabel: 'edited 5 months ago',
    status: 'draft',
    tags: ['archive', 'agency'],
    initials: 'NS',
    recent: false,
  },
];

export type ActivityItem = {
  key: string;
  label: string;
  timestamp: string;
  Icon: ComponentType<SvgProps>;
};

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    key: 'published-prasoon',
    label: 'Published “Prasoon Portfolio CMS”',
    timestamp: '2 days ago',
    Icon: ActivityPublish,
  },
  {
    key: 'edited-hero',
    label: 'Edited the Home hero',
    timestamp: '3 days ago',
    Icon: ActivityEdit,
  },
  {
    key: 'added-cpacc',
    label: 'Added CPACC certification',
    timestamp: '5 days ago',
    Icon: ActivityCertificate,
  },
  {
    key: 'uploaded-portrait',
    label: 'Uploaded portrait-2026.jpg',
    timestamp: '1 week ago',
    Icon: ActivityImage,
  },
  {
    key: 'uploaded-resume',
    label: 'Uploaded resume (v3)',
    timestamp: '2 weeks ago',
    Icon: ActivityDocument,
  },
];
