import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VideocamIcon from '@mui/icons-material/Videocam';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

export const menu = [
  {
    name: 'Bạn bè',
    icon: <PeopleIcon color="primary" fontSize="large" />,
    description: 'Tìm kiếm bạn bè và những người bạn biết.',
  },
  {
    name: 'Đã lưu',
    icon: <BookmarkAddedIcon color="secondary" fontSize="large" />,
    description: 'Tìm kiếm bạn bè và những người bạn biết.',
  },
  {
    name: 'Nhắn tin',
    icon: <MessageIcon color="success" fontSize="large" />,
    description: 'Tìm kiếm bạn bè và những người bạn biết.',
  },
];
export const create = [
  {
    name: 'Bài viết',
    icon: <PostAddIcon />,
  },
  {
    name: 'Tạo phòng',
    icon: <VideocamIcon />,
  },
  {
    name: 'Dashboard',
    icon: <DashboardCustomizeIcon />,
  },
];
