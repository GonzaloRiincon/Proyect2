| HTTP Verb  | Route                       | Description                          | JSON |   
|------------|-----------------------------|--------------------------------------|------|
| GET        | `/signup`                   | List of all drivers                  |      |   
| POST       | `/signup`                   | List of all drivers of a year        |      |   
| GET        | `/login`                    | Details of a driver                  |      |   
| POST       | `/login`                    | List of users registered             |      |   
| GET        | `/logout`                   | Personal profile                     |      |   
| GET        | `/drivers/list`             | List of all drivers                  |      |  
| GET        | `/drivers/list/name`        | List of all drivers                  |      |   
| GET        | `/drivers/list/year`        | List of all drivers of a year        |      |   
| GET        | `/drivers/:driverId`        | Details of a driver                  |      |   
| GET        | `/user/list`                | List of users registered             |      |   
| GET        | `/user/profile/:id`         | Personal profile                     |      |    
| GET        | `/api//circuit/:circuitID`  | Paths we maybe use for chartJs       | ✅   |
| GET        | `/circuit/list`             | Last of all circuits                 |      |
| GET        | `/circuit/list/year`        | Circuits filtered by year            |      |
| GET        | `/circuit/list/name`        | Circuits filtered by name            |      |  
| GET        | `/circuit/:circuitID`       | Circuits fintered by ID              |      |  
| GET        | `/events/list`              | List of events                       |      |  
| GET        | `/events/finished`          | List of events finished              |      |  
| GET        | `/events/create`            | Add new event (admin, editor)        |      |   
| POST       | `/events/create`            | Add new event (admin, editor)        |      |      
| POST       | `/events/finish/:id`        | Finish an existing event (adm, edit) |      |   
| POST       | `/events/delete/:id`        | Delete an existing event (adm, edit) |      |  
| GET        | `/`                         | Render the ranking ordered by score  |      |   
| GET        | `/user/list`                | List of all users                    |      |   
| GET        | `/user/profile/edit/:id`    | Edit user profile (user/admin)       |      |   
| POST       | `/user/profile/edit/:id`    | Edit user profile (user/admin)       |      |   
| GET        | `/user/profile/:id`         | User profile details (user/admin)    |      |   
| POST       | `/user/delete/:id`          | Delete user Team (admin)             |      |     
| POST       | `/user/role/:id`            | Edit user roles (admin)              |      |      
| POST       | `/add/:driverId`            | Add driver by ID                     |      |   
| POST       | `/delete/:driverId`         | Delete driver by ID                  |      |   
