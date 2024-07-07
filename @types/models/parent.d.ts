interface Parent extends Omit<User, 'role' | 'attachment'> {
  id: number;
  children: Array<StudentPreview>;
}
