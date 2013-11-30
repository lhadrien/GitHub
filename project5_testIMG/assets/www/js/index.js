/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
  			function desactivationtips() {
				var spaname = document.getElementsByTagName('span'),
					spanlength = spaname.length;
					
				for (var i = 0; i < spanlength; i++)
				{
					if (spaname[i].className == 'tips')
						spaname[i].style.display = 'none';
				}
				
			}
			
			function gettips(elements)
			{
				while (elements = elements.nextSibling)
				{
					if (elements.className === 'tips')
						return elements;
				}
				return false;
			}
			
			var check = {};
			
			check['sex'] = function() {
				var sex = document.getElementsByName('sex'),
					tipsStyle = gettips(sex[1].parentNode).style;
					
				if (sex[0].checked || sex[1].checked)
				{
					tipsStyle.display = 'none';
					return true;
				}
				else
				{
					tipsStyle.display = 'inline-block';
					return false;
				}
			};
			
			check['LastName'] = function(id) {
				var ln = document.getElementById(id),
					tipsStyle = gettips(ln).style;
					
				if (ln.value.length >= 2)
				{
					ln.className = 'correct';
					tipsStyle.display = 'none';
					return true;
				}
				else
				{
					ln.className = 'incorrect';
					tipsStyle.display = 'inline-block';
					return false;
				}
			};
			
			check['FirstName'] = check['LastName'];
			
			check['Age'] = function() {
				var the_age = document.getElementById('Age'),
					ageStyle = gettips(the_age).style,
					ageInt = parseInt(the_age.value);
					
				if (!isNaN(ageInt) && ageInt >= 5 && ageInt <= 140)
				{
					the_age.className = 'correct';
					ageStyle.display = 'none';
					return true;
				}
				else
				{
					the_age.classeName = 'incorrect';
					ageStyle.display = 'inline-block';
					return false;
				}
			};
			
			check['Nick'] = function() {
				var Nick = document.getElementById('Nick'),
					nickStyle = gettips(Nick).style;
					
				if (Nick.value.length >= 4)
				{
					Nick.className = 'correct';
					nickStyle.display = 'none';
					return true;
				}
				else
				{
					Nick.className = 'incorrect';
					nickStyle.display = 'inline-block';
					return false;
				}
			};
			
			check['Pass1'] = function() {
				var pass1 = document.getElementById('Pass1'),
					pass1Style = gettips(pass1).style;
					
				if (pass1.value.length >= 6)
				{
					pass1.className = 'correct';
					pass1Style.display = 'none';
					return true;
				}
				else
				{
					pass1.className = 'incorrect';
					pass1Style.display = 'inline-block';
					return false;
				}
			};
			
			check['Pass2'] = function() {
				var pass1 = document.getElementById('Pass1'),
					pass2 = document.getElementById('Pass2'),
					pass2Style = gettips(pass2).style;
					
				if (pass1.value === pass2.value && pass2.value != '')
				{
					pass2.classeName = 'correct';
					pass2Style.display = 'none';
					return true;
				}
				else
				{
					pass2.classeName = 'incorrect';
					pass2Style.display = 'inline-block';
					return false;
				}
			};
			
			check['country'] = function() {
				var country = document.getElementById('country'),
					countryStyle = gettips(country).style;
					
				if (country.options[country.selectedIndex].value != 'none')
				{
					countryStyle.display = 'none';
					return true;
				}
				else
				{
					countryStyle.display = 'inline-block';
					return false;
				}
			};
				
			(function() {
				var theForm = document.getElementById('theForm'),
					inputs = document.getElementsByTagName('input'),
					inputslength = inputs.length;
					
				for (var i = 0; i < inputslength; i++)
				{
					if (inputs[i].type === 'text' || inputs[i].type === 'password')
					{
						inputs[i].onkeyup = function() {
							check[this.id](this.id);
						};
					}
				}
				
				theForm.onsubmit = function() {
					var result = true;
					
					for (var i in check)
					{
						result = check[i](i) && result;
					}
					
					if (result)
					{
						alert("Le formulaire est bien rempli, si ce truc s'affiche, c'est que l'appli a marché");
						alert("Tu es maintenant redirige vers la page des tests images, cadeau.");
						window.location.replace("page2.html");
						return false;
					}
					else
					{
						alert("Le formulaire n'est pas bien rempli");
					}
					return false;
				};
				
				theForm.onreset = function() {
					for (var i = 0; i < inputslength; i++)
					{
						if (inputs[i].type == 'text' || inputs[i].type == 'password')
						{
							inputs[i].className = '';
						}
					}
					desactivationtips();
				};
			})();
			desactivationtips();
