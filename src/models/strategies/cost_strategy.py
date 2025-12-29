from src.models.strategies.rental_cost_interface import RentalCostStrategy
from src.models.strategies.decorator_strategy import CostDecorator

import holidays
from datetime import datetime
from decimal import Decimal

# type checking for proper hinting
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.models.car import Car

class StandardCarCost(RentalCostStrategy):
    def calculate_cost(self, car: "Car", days: int) -> float:
        return car.daily_rate * Decimal(days)
    
class SUVRentalCost(RentalCostStrategy):
    SUV_COST_COEFFICIENT = 1.2
    def calculate_cost(self, car: "Car", days: int) -> float:
        return car.daily_rate * Decimal(days) * Decimal(self.SUV_COST_COEFFICIENT)
    
class LongTermRentalCost(CostDecorator):
    # 15% percent discount if rent is at least 7 days
    def calculate_cost(self, car: "Car", days: int) -> float:
        base_cost = self._wrapped.calculate_cost(car, days)
        if days >= 7:
            return base_cost * Decimal(0.85) 
        return base_cost
    
class HolidayDiscount(CostDecorator):
    # discount on holidays
    az_holidays = holidays.country_holidays('AZ')
    HOLIDAY_DISCOUNT = 10 

    def calculate_cost(self, car: "Car", days: int) -> float:
        # 10% percent discount if current date is a holiday 
        current_date = datetime.now().date()
        base_cost = self._wrapped.calculate_cost(car, days)
        discount = (1 - self.HOLIDAY_DISCOUNT / 100)
    
        if current_date in self.az_holidays:
            return base_cost * Decimal(discount)
        return base_cost