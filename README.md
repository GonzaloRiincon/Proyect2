| HTTP Verb  | Route                       | Description                      | JSON |   
|------------|-----------------------------|----------------------------------|------|
| GET        | `/signup`                   | List of all drivers              |      |   
| POST       | `/signup`                   | List of all drivers of a year    |      |   
| GET        | `/login`                    | Details of a driver              |      |   
| POST       | `/login`                    | List of users registered         |      |   
| GET        | `/logout`                   | Personal profile                 |      |   
| GET        | `/drivers`                  | List of all drivers              |      |   
| GET        | `/drivers/:year`         | List of all drivers of a year    |      |   
| GET        | `/drivers/:id`              | Details of a driver              |      |   
| GET        | `/user/list`                | List of users registered         |      |   
| GET        | `/user/profile/:id`         | Personal profile                 |      |   
| GET        | `/circuits`                 | Last season circuits             |      |   
| GET        | `/team`                     | Last season teams                |      |   
| GET        | `/events/create`            | Add new event (admin)            |      |   
| POST       | `/events/create`            | Add new event (admin)            |      |   
| GET        | `/events/edit/:id`          | Edit an existing event (admin)   |      |   
| POST       | `/events/edit/:id`          | Edit an existing event (admin)   |      |   
| POST       | `/events/delete/:id`        | Delete an existing event (admin) |      |   
| GET        | `/events`                   | List of events                   |      |   
| GET        | `/events/:id`               | Details of an event              |      |   
| GET        | `/user/profile/edit/:id`    | Edit user profile (user/admin)   |      |   
| POST       | `/user/profile/edit/:id`    | Edit user profile (user/admin)   |      |   
| POST       | `/user/delete/:id`          | Delete user Team (admin)         |      |   
| GET        | `/user/profile/team-create` | Create user Team (user)          |      |   
| POST       | `/user/profile/team-create` | Create user Team (user)          |      |   
| GET        | `/user/profile/team-edit`   | Edit user team (user)            |      |   
| POST       | `/user/profile/team-edit`   | Edit user team (user)            |      |   
| GET        | `/api/`                     | Paths we maybe use for chartJs   | ✅   |