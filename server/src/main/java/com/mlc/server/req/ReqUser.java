



package com.mlc.server.req;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqUser {
private String firstName;
private String lastName;
private String phoneNumber;
private Date birthDate;
private String experience;
private String balance;
}
