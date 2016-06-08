package br.org.studio.administration;

import java.util.ArrayList;
import java.util.List;

import br.org.domain.administration.service.AdministrationUserServiceBean;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.domain.repository.dao.RepositoryDao;
import br.org.domain.user.dao.UserDaoBean;
import br.org.domain.email.service.EmailNotifierServiceBean;
import br.org.domain.user.User;
import br.org.domain.exceptions.DataNotFoundException;
import br.org.domain.repository.service.RepositoryService;
import br.org.domain.administration.dto.UserDto;
import br.org.domain.administration.dto.AdministrationUser;

/**
 * Created by diogoferreira on 03/11/15.
 */
@RunWith(MockitoJUnitRunner.class)
public class AdministrationUserServiceBeanTest {
	private static final String NAME = "User";
	private static final String SURNAME = "Surname";
	private static final String PASSWORD = "Password";
	private static final String EMAIL = "Email";
	private static final String PHONE = "Phone";

	private static final Integer FIRST = 0;
	private static final int REPETITIONS_NUMBER = 5;

	@InjectMocks
	private AdministrationUserServiceBean administrationUserServiceBean;

	@Mock
	private EmailNotifierServiceBean emailNotifierServiceBean;

	@Mock
	private UserDaoBean userDaoBean;

	@Mock
	private UserDto userDto;

	@Mock
	private RepositoryDao repositoryDao;
	
	@Mock
	private RepositoryService repositoryService;

	@Test
	public void fetchUsers_should_fetch_all_users() {
		Mockito.when(userDaoBean.fetchAll()).thenReturn(new ArrayList<User>());

		administrationUserServiceBean.fetchUsers();

		Mockito.verify(userDaoBean).fetchAll();
	}

	@Test
	public void fetchUsers_should_equalize_dto_When_fetched_user() {
		List<User> fetchedUsers = new ArrayList<>();
		User user = new User(NAME, SURNAME, PASSWORD, EMAIL, PHONE);
		user.enable();

		Mockito.when(userDaoBean.fetchAll()).thenReturn(fetchedUsers);

		fetchedUsers.add(user);
		AdministrationUser administrationUser = administrationUserServiceBean.fetchUsers();
		List<UserDto> activedUsers = administrationUser.getActivedUsers();

		Assert.assertEquals(activedUsers.get(FIRST).getEmail(), EMAIL);
		Assert.assertEquals(activedUsers.get(FIRST).getName(), NAME);
	}

	@Test
	public void fetchUsers_should_return_all_fetched_users() {
		List<User> fetchedUsers = new ArrayList<>();
		User user = new User(NAME, SURNAME, PASSWORD, EMAIL, PHONE);
		user.enable();

		Mockito.when(userDaoBean.fetchAll()).thenReturn(fetchedUsers);
		int counter = 0;

		do {
			fetchedUsers.add(user);
			counter++;
		} while (counter < REPETITIONS_NUMBER);

		AdministrationUser administrationUser = administrationUserServiceBean.fetchUsers();
		List<UserDto> activedUsers = administrationUser.getActivedUsers();

		Assert.assertEquals(activedUsers.size(), REPETITIONS_NUMBER);
	}

	@Test
	public void disableUsers_should_fetch_user_by_email() throws DataNotFoundException {
		List<UserDto> userDtos = new ArrayList<>();
		User user = new User();

		Mockito.when(userDto.getEmail()).thenReturn(EMAIL);
		Mockito.when(userDaoBean.fetchByEmail(EMAIL)).thenReturn(user);

		userDtos.add(userDto);

		administrationUserServiceBean.disableUsers(userDtos);

		Mockito.verify(userDaoBean).fetchByEmail(userDtos.get(FIRST).getEmail());
	}

	@Test
	public void enableUsers_should_fetch_user_by_email() throws DataNotFoundException {
		List<UserDto> userDtos = new ArrayList<>();
		User user = new User();

		Mockito.when(userDto.getEmail()).thenReturn(EMAIL);
		Mockito.when(userDaoBean.fetchByEmail(EMAIL)).thenReturn(user);
		Mockito.when(repositoryDao.userHasRepository(user)).thenReturn(true);

		userDtos.add(userDto);

		administrationUserServiceBean.enableUsers(userDtos);

		Mockito.verify(userDaoBean).fetchByEmail(userDtos.get(FIRST).getEmail());
	}
	
	@Test
	public void enableUsers_should_creates_a_repository_to_users_who_does_not_have_repository() throws DataNotFoundException {
		List<UserDto> userDtos = new ArrayList<>();
		User user = new User();
		
		Mockito.when(userDto.getEmail()).thenReturn(EMAIL);
		Mockito.when(userDaoBean.fetchByEmail(EMAIL)).thenReturn(user);
		Mockito.when(repositoryDao.userHasRepository(user)).thenReturn(false);
		
		userDtos.add(userDto);
		
		administrationUserServiceBean.enableUsers(userDtos);
		
		Mockito.verify(repositoryService).createRepositoryTo(user);
	}

	@Test
	public void enableUsers_should_NOT_creates_a_repository_to_users_that_hasve_a_repository() throws DataNotFoundException {
		List<UserDto> userDtos = new ArrayList<>();
		User user = new User();
		
		Mockito.when(userDto.getEmail()).thenReturn(EMAIL);
		Mockito.when(userDaoBean.fetchByEmail(EMAIL)).thenReturn(user);
		Mockito.when(repositoryDao.userHasRepository(user)).thenReturn(true);
		
		userDtos.add(userDto);
		
		administrationUserServiceBean.enableUsers(userDtos);
		
		Mockito.verify(repositoryService, Mockito.times(0)).createRepositoryTo(user);
	}
	
}
