package br.org.domain.registration;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.domain.system.dao.SystemConfigDao;
import br.org.domain.user.dao.UserDao;
import br.org.domain.administration.dto.UserDto;
import br.org.domain.email.service.EmailNotifierService;
import br.org.domain.email.NewUserNotificationEmail;
import br.org.domain.user.User;
import br.org.domain.exception.EmailNotificationException;
import br.org.domain.exception.FillUserException;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.tutty.Equalizer;

@Stateless
@Local(RegisterUserService.class)
public class RegisterUserServiceBean implements RegisterUserService {

	@Inject
	private SystemConfigDao genericDao;
	@Inject
	private EmailNotifierService emailNotifier;
    @Inject
    private UserDao userDao;
    @Inject
    private EmailNotifierService emailNotifierService;

	@Override
	public void createUser(UserDto userDto) throws FillUserException {
		try {
			User user = new User();
			Equalizer.equalize(userDto, user);
			genericDao.persist(user);

			notifyAdm(user);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new FillUserException();
		}
	}

	private void notifyAdm(User user) {
		try {
			try {
                User admin = userDao.findAdmin();

                NewUserNotificationEmail newUserNotificationEmail = new NewUserNotificationEmail(user);
                newUserNotificationEmail.defineAdminRecipient(admin);
                newUserNotificationEmail.setFrom(emailNotifierService.getSender());

                emailNotifier.sendEmail(newUserNotificationEmail);
			} catch (DataNotFoundException e) {
				e.printStackTrace();
			}
		} catch (EmailNotificationException e) {
			e.printStackTrace();
		}
	}
}