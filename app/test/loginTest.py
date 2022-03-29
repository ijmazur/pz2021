from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoAlertPresentException
from selenium.common.exceptions import UnexpectedAlertPresentException
import time
from webdriver_manager.chrome import ChromeDriverManager
import csv


def slow_typing(element, text):
   for character in text:
      element.send_keys(character)

results = open('resultsLogin.txt','w')

with open('dataLogin.csv', 'rt', encoding="utf-8-sig") as f:
   data = csv.DictReader(f)
   for detail in data:
      id = detail['testID']
      expectedCase = detail['testCase']
      mail = detail['mail']
      password: object = detail['password']

      driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
      startUrl = "https://test-zamow-jedzenie.herokuapp.com/login"
      driver.get("https://test-zamow-jedzenie.herokuapp.com/login")
      driver.maximize_window()


      emailLink = driver.find_element(By.ID,'email')
      slow_typing(emailLink, mail)

      element = driver.find_elements(By.ID, 'password')
      for w in element:
         slow_typing(w, password)



      driver.find_element(By.XPATH, '//button[@type="submit"]').click()
      time.sleep(2)
      try:
         driver.switch_to.alert.accept()
      except UnexpectedAlertPresentException:
         driver.switch_to.alert.accept()
      except NoAlertPresentException:
         time.sleep(2)
      endUrl = driver.current_url


      if startUrl != endUrl:
         resultCase = "A07"
         results.write(id + " Login completed ")
      else:
         resultCase = "A08"
         results.write(id + " Wrong data ")
      if(resultCase == expectedCase):
         results.write( " - Passed \n")
      else:
         results.write("  - Not passed \n")



      time.sleep(1)

      driver.close()





