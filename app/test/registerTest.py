from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from webdriver_manager.chrome import ChromeDriverManager
import csv


def slow_typing(element, text):
   for character in text:
      element.send_keys(character)

results = open('resultsRegister.txt', 'w')

with open('dataRegister.csv', 'rt', encoding="utf-8-sig") as f:
   data = csv.DictReader(f)
   for detail in data:
      id = detail['testID']
      expectedCase = detail['testCase']
      fName = detail['firstName']
      lName = detail['lastName']
      street = detail['street']
      city = detail['city']
      postal = detail['postal']
      phoneNr = detail['number']
      mail = detail['mail']
      password: object = detail['password']

      driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
      startUrl = "https://test-zamow-jedzenie.herokuapp.com/register"
      driver.get(startUrl)
      driver.maximize_window()


      fnameLink = driver.find_element(By.ID,'firstName')
      slow_typing(fnameLink, fName)


      lnameLink = driver.find_element(By.ID,'lastName')
      slow_typing(lnameLink, lName)


      streetLink = driver.find_element(By.ID,'street')
      slow_typing(streetLink, street)


      cityLink = driver.find_element(By.ID,'city')
      slow_typing(cityLink, city)


      postalLink = driver.find_element(By.ID,'postalCode')
      slow_typing(postalLink, postal)


      phoneLink = driver.find_element(By.ID,'phoneNumber')
      slow_typing(phoneLink, phoneNr)


      emailLink = driver.find_element(By.ID,'email')
      slow_typing(emailLink, mail)

      element = driver.find_elements(By.ID, 'password')
      for w in element:
         slow_typing(w, password)

      message_body_html_elements = driver.find_elements(By.ID, 'city-helper-text')
      for msg in message_body_html_elements:
         resultCase = "A06"
         results.write(id + " Wrong city ")
         if (resultCase == expectedCase):
            results.write(" - Passed \n")
         else:
            results.write("  - Not passed \n")


      message_body_html_elements = driver.find_elements(By.ID, 'password-helper-text')
      for msg in message_body_html_elements:
         resultCase = "A05"
         results.write(id + " Wrong password ")
         if (resultCase == expectedCase):
            results.write(" - Passed \n")
         else:
            results.write("  - Not passed \n")


      message_body_html_elements = driver.find_elements(By.ID, 'email-helper-text')
      for msg in message_body_html_elements:
         resultCase = "A03"
         results.write(id + " Wrong email")
         if (resultCase == expectedCase):
            results.write(" - Passed \n")
         else:
            results.write("  - Not passed \n")


      message_body_html_elements = driver.find_elements(By.ID, 'phoneNumber-helper-text')
      for msg in message_body_html_elements:
         resultCase = "A02"
         results.write(id + " Phone number too short")
         if (resultCase == expectedCase):
            results.write(" - Passed \n")
         else:
            results.write("  - Not passed \n")


      message_body_html_elements = driver.find_elements(By.ID, 'postalCode-helper-text')
      for msg in message_body_html_elements:
         resultCase = "A04"
         results.write(id + " Postal code too short")
         if (resultCase == expectedCase):
            results.write(" - Passed \n")
         else:
            results.write("  - Not passed \n")


      driver.find_element(By.XPATH,'//button[@type="submit"]').click()
      endUrl = driver.current_url


      if startUrl != endUrl:
         resultCase = "A01"
         results.write(id + " Registration completed ")
         if(resultCase == expectedCase):
            results.write( " - Passed \n")
         else:
            results.write("  - Not passed \n")



      time.sleep(1)
      driver.close()





