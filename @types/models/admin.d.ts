interface Admin extends User {}

interface AdminPreview extends User {}

interface AdminRequest extends Omit<Admin, 'id' | 'attachment'> {
  password: string;
}
