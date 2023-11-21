from django import forms
from .models import Reservation
from .models import Cake
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'Email'}))

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(SignUpForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user


class ContactForm(forms.Form):
    name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Name'})
        )
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': 'Email'})
        )
    phone = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Phone'})
        )
    message = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': 'Message'})
        )


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['cake', 'datetime']
        widgets = {
            'cake': forms.Select(
                attrs={
                    'class': 'form-control', 
                    'placeholder': 'Select Your Cake'
                }
            ),
            'datetime': forms.DateTimeInput(
                attrs={
                    'class': 'form-control', 
                    'placeholder': 'Pick a Date and Time', 
                    'type': 'datetime-local'
                }
            ),
        }
    
        labels = {
            'cake': '',
            'datetime': '',
        }