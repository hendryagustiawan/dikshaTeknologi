import { useState } from 'react';
import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  Switch,
  ListItemAvatar,
  Avatar,
  styled
} from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import PhoneLockedTwoToneIcon from '@mui/icons-material/PhoneLockedTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import Text from 'src/components/Text';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

function Transaction() {
  const [checked, setChecked] = useState(['phone_verification']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card>
      <CardHeader title="Transaction" />
      <Divider />
      <List disablePadding>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemText
            primary={<Text color="black">Book I Look You Sad</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="error">Not Active</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemText
            primary={<Text color="black">Laptop Ideapad</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="success">Active</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemText
            primary={<Text color="black">Iphone 15 Pro Max</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="success">Active</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
      </List>
    </Card>
  );
}

export default Transaction;
