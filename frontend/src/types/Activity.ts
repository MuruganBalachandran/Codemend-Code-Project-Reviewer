export interface Activity {
  id: string;
  type: 'project' | 'review' | 'comment' | 'suggestion';
  title: string;
  date: string;
  projectId?: string;
  projectName?: string;
  content?: string;
}
